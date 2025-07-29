import json
from datetime import datetime
from typing import Optional
from ..core.database import get_database
from ..models.sto import STO, SalesHarian, ArsitekturJaringan, MetadataSTO
from ..schemas.sto import (
    STOCreate, STOUpdate, STOResponse, STOListQuery,
    SalesHarianCreate, ArsitekturJaringanCreate, MetadataSTOCreate
)
from .deps import HTTPException, parse_json_body, create_response, create_error_response, create_paginated_response, require_auth

def get_stos(request, response):
    """Get list of STOs with pagination and filtering"""
    try:
        # Parse query parameters
        query_params = getattr(request, 'query_params', {})
        page = int(query_params.get('page', 1))
        limit = int(query_params.get('limit', 20))
        search = query_params.get('search', '').strip()
        region = query_params.get('region', '').strip()
        status = query_params.get('status', '').strip()
        
        # Validate query parameters
        query = STOListQuery(page=page, limit=limit, search=search, region=region, status=status)
        is_valid, error_msg = query.validate()
        if not is_valid:
            response.status_code = 400
            return create_error_response(error_msg, 400)
        
        db = get_database()
        
        # Build WHERE clause
        where_conditions = []
        params = []
        
        if search:
            where_conditions.append("(sto_id ILIKE %s OR name ILIKE %s OR location ILIKE %s)")
            search_pattern = f"%{search}%"
            params.extend([search_pattern, search_pattern, search_pattern])
        
        if region:
            where_conditions.append("region = %s")
            params.append(region)
        
        if status:
            where_conditions.append("status = %s")
            params.append(status)
        
        where_clause = " AND ".join(where_conditions) if where_conditions else "1=1"
        
        # Get total count
        count_query = f"SELECT COUNT(*) FROM sto WHERE {where_clause}"
        total_result = db.execute_one(count_query, tuple(params))
        total = total_result[0] if total_result else 0
        
        # Get paginated results
        offset = (page - 1) * limit
        data_query = f"""
            SELECT id, sto_id, name, location, region, province, latitude, longitude, status, created_at, updated_at
            FROM sto 
            WHERE {where_clause}
            ORDER BY sto_id
            LIMIT %s OFFSET %s
        """
        params.extend([limit, offset])
        
        rows = db.execute_query(data_query, tuple(params))
        stos = [STO.from_db_row(row).to_dict() for row in rows]
        
        return create_paginated_response(stos, page, limit, total, "STOs retrieved successfully")
        
    except Exception as e:
        response.status_code = 500
        return create_error_response("Internal server error", 500)

def get_sto(request, response):
    """Get a specific STO by ID"""
    try:
        sto_id = request.path_params.get('id')
        if not sto_id:
            response.status_code = 400
            return create_error_response("STO ID is required", 400)
        
        db = get_database()
        row = db.execute_one(
            "SELECT id, sto_id, name, location, region, province, latitude, longitude, status, created_at, updated_at FROM sto WHERE sto_id = %s",
            (sto_id,)
        )
        
        if not row:
            response.status_code = 404
            return create_error_response("STO not found", 404)
        
        sto = STO.from_db_row(row)
        return create_response(sto.to_dict(), "STO retrieved successfully")
        
    except Exception as e:
        response.status_code = 500
        return create_error_response("Internal server error", 500)

def create_sto(request, response):
    """Create a new STO"""
    try:
        require_auth(request)  # Require authentication
        
        body = parse_json_body(request)
        sto_data = STOCreate(
            sto_id=body.get('sto_id', ''),
            name=body.get('name', ''),
            location=body.get('location', ''),
            region=body.get('region', ''),
            province=body.get('province', ''),
            latitude=body.get('latitude'),
            longitude=body.get('longitude')
        )
        
        # Validate input
        is_valid, error_msg = sto_data.validate()
        if not is_valid:
            response.status_code = 400
            return create_error_response(error_msg, 400)
        
        db = get_database()
        
        # Check if STO already exists
        existing = db.execute_one("SELECT id FROM sto WHERE sto_id = %s", (sto_data.sto_id,))
        if existing:
            response.status_code = 400
            return create_error_response("STO ID already exists", 400)
        
        # Create STO
        now = datetime.utcnow()
        sto_id = db.execute_insert(
            """INSERT INTO sto (sto_id, name, location, region, province, latitude, longitude, status, created_at, updated_at)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id""",
            (sto_data.sto_id, sto_data.name, sto_data.location, sto_data.region, 
             sto_data.province, sto_data.latitude, sto_data.longitude, 'Active', now, now)
        )
        
        if not sto_id:
            response.status_code = 500
            return create_error_response("Failed to create STO", 500)
        
        # Return created STO
        sto = STO(
            id=sto_id,
            sto_id=sto_data.sto_id,
            name=sto_data.name,
            location=sto_data.location,
            region=sto_data.region,
            province=sto_data.province,
            latitude=sto_data.latitude,
            longitude=sto_data.longitude,
            status='Active',
            created_at=now,
            updated_at=now
        )
        
        response.status_code = 201
        return create_response(sto.to_dict(), "STO created successfully", 201)
        
    except HTTPException as e:
        response.status_code = e.status_code
        return create_error_response(e.detail, e.status_code)
    except Exception as e:
        response.status_code = 500
        return create_error_response("Internal server error", 500)

def update_sto(request, response):
    """Update an existing STO"""
    try:
        require_auth(request)
        
        sto_id = request.path_params.get('id')
        if not sto_id:
            response.status_code = 400
            return create_error_response("STO ID is required", 400)
        
        body = parse_json_body(request)
        update_data = STOUpdate(
            name=body.get('name'),
            location=body.get('location'),
            region=body.get('region'),
            province=body.get('province'),
            latitude=body.get('latitude'),
            longitude=body.get('longitude'),
            status=body.get('status')
        )
        
        # Validate input
        is_valid, error_msg = update_data.validate()
        if not is_valid:
            response.status_code = 400
            return create_error_response(error_msg, 400)
        
        db = get_database()
        
        # Check if STO exists
        existing = db.execute_one("SELECT id FROM sto WHERE sto_id = %s", (sto_id,))
        if not existing:
            response.status_code = 404
            return create_error_response("STO not found", 404)
        
        # Build update query
        update_fields = []
        params = []
        
        if update_data.name is not None:
            update_fields.append("name = %s")
            params.append(update_data.name)
        
        if update_data.location is not None:
            update_fields.append("location = %s")
            params.append(update_data.location)
        
        if update_data.region is not None:
            update_fields.append("region = %s")
            params.append(update_data.region)
        
        if update_data.province is not None:
            update_fields.append("province = %s")
            params.append(update_data.province)
        
        if update_data.latitude is not None:
            update_fields.append("latitude = %s")
            params.append(update_data.latitude)
        
        if update_data.longitude is not None:
            update_fields.append("longitude = %s")
            params.append(update_data.longitude)
        
        if update_data.status is not None:
            update_fields.append("status = %s")
            params.append(update_data.status)
        
        if not update_fields:
            response.status_code = 400
            return create_error_response("No fields to update", 400)
        
        update_fields.append("updated_at = %s")
        params.append(datetime.utcnow())
        params.append(sto_id)
        
        update_query = f"UPDATE sto SET {', '.join(update_fields)} WHERE sto_id = %s"
        db.execute_query(update_query, tuple(params))
        
        # Return updated STO
        row = db.execute_one(
            "SELECT id, sto_id, name, location, region, province, latitude, longitude, status, created_at, updated_at FROM sto WHERE sto_id = %s",
            (sto_id,)
        )
        
        sto = STO.from_db_row(row)
        return create_response(sto.to_dict(), "STO updated successfully")
        
    except HTTPException as e:
        response.status_code = e.status_code
        return create_error_response(e.detail, e.status_code)
    except Exception as e:
        response.status_code = 500
        return create_error_response("Internal server error", 500)

def delete_sto(request, response):
    """Delete an STO"""
    try:
        require_auth(request)
        
        sto_id = request.path_params.get('id')
        if not sto_id:
            response.status_code = 400
            return create_error_response("STO ID is required", 400)
        
        db = get_database()
        
        # Check if STO exists
        existing = db.execute_one("SELECT id FROM sto WHERE sto_id = %s", (sto_id,))
        if not existing:
            response.status_code = 404
            return create_error_response("STO not found", 404)
        
        # Delete STO (cascade will handle related data)
        db.execute_query("DELETE FROM sto WHERE sto_id = %s", (sto_id,))
        
        return create_response(None, "STO deleted successfully")
        
    except HTTPException as e:
        response.status_code = e.status_code
        return create_error_response(e.detail, e.status_code)
    except Exception as e:
        response.status_code = 500
        return create_error_response("Internal server error", 500)

def get_sto_sales(request, response):
    """Get sales data for a specific STO"""
    try:
        sto_id = request.path_params.get('id')
        if not sto_id:
            response.status_code = 400
            return create_error_response("STO ID is required", 400)
        
        query_params = getattr(request, 'query_params', {})
        limit = int(query_params.get('limit', 100))
        
        db = get_database()
        
        # Check if STO exists
        existing = db.execute_one("SELECT id FROM sto WHERE sto_id = %s", (sto_id,))
        if not existing:
            response.status_code = 404
            return create_error_response("STO not found", 404)
        
        # Get sales data
        rows = db.execute_query(
            """SELECT id, sto_id, tanggal, total_barang_terjual, created_at 
               FROM sales_harian 
               WHERE sto_id = %s 
               ORDER BY tanggal DESC 
               LIMIT %s""",
            (sto_id, limit)
        )
        
        sales = [SalesHarian.from_db_row(row).to_dict() for row in rows]
        
        return create_response(sales, "Sales data retrieved successfully")
        
    except Exception as e:
        response.status_code = 500
        return create_error_response("Internal server error", 500)