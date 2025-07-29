import json
from datetime import datetime
from typing import Optional
from ..core.database import get_database
from ..models.warehouse import Warehouse, SupplyWarehouse
from ..schemas.warehouse import (
    WarehouseCreate, WarehouseUpdate, WarehouseResponse, WarehouseListQuery,
    SupplyWarehouseCreate
)
from .deps import HTTPException, parse_json_body, create_response, create_error_response, create_paginated_response, require_auth

def get_warehouses(request, response):
    """Get list of warehouses with pagination and filtering"""
    try:
        # Parse query parameters
        query_params = getattr(request, 'query_params', {})
        page = int(query_params.get('page', 1))
        limit = int(query_params.get('limit', 20))
        search = query_params.get('search', '').strip()
        region = query_params.get('region', '').strip()
        status = query_params.get('status', '').strip()
        
        # Validate query parameters
        query = WarehouseListQuery(page=page, limit=limit, search=search, region=region, status=status)
        is_valid, error_msg = query.validate()
        if not is_valid:
            response.status_code = 400
            return create_error_response(error_msg, 400)
        
        db = get_database()
        
        # Build WHERE clause
        where_conditions = []
        params = []
        
        if search:
            where_conditions.append("(warehouse_id ILIKE %s OR name ILIKE %s OR location ILIKE %s)")
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
        count_query = f"SELECT COUNT(*) FROM warehouse WHERE {where_clause}"
        total_result = db.execute_one(count_query, tuple(params))
        total = total_result[0] if total_result else 0
        
        # Get paginated results
        offset = (page - 1) * limit
        data_query = f"""
            SELECT id, warehouse_id, name, location, region, capacity, current_stock, 
                   reserved_stock, available_stock, manager_name, contact_phone, status,
                   created_at, updated_at
            FROM warehouse 
            WHERE {where_clause}
            ORDER BY warehouse_id
            LIMIT %s OFFSET %s
        """
        params.extend([limit, offset])
        
        rows = db.execute_query(data_query, tuple(params))
        warehouses = []
        
        for row in rows:
            warehouse = Warehouse.from_db_row(row)
            warehouse_dict = warehouse.to_dict()
            warehouse_dict['utilization_percentage'] = warehouse.utilization_percentage
            warehouses.append(warehouse_dict)
        
        return create_paginated_response(warehouses, page, limit, total, "Warehouses retrieved successfully")
        
    except Exception as e:
        response.status_code = 500
        return create_error_response("Internal server error", 500)

def get_warehouse(request, response):
    """Get a specific warehouse by ID"""
    try:
        warehouse_id = request.path_params.get('id')
        if not warehouse_id:
            response.status_code = 400
            return create_error_response("Warehouse ID is required", 400)
        
        db = get_database()
        row = db.execute_one(
            """SELECT id, warehouse_id, name, location, region, capacity, current_stock, 
                      reserved_stock, available_stock, manager_name, contact_phone, status,
                      created_at, updated_at 
               FROM warehouse WHERE warehouse_id = %s""",
            (warehouse_id,)
        )
        
        if not row:
            response.status_code = 404
            return create_error_response("Warehouse not found", 404)
        
        warehouse = Warehouse.from_db_row(row)
        warehouse_dict = warehouse.to_dict()
        warehouse_dict['utilization_percentage'] = warehouse.utilization_percentage
        
        return create_response(warehouse_dict, "Warehouse retrieved successfully")
        
    except Exception as e:
        response.status_code = 500
        return create_error_response("Internal server error", 500)

def create_warehouse(request, response):
    """Create a new warehouse"""
    try:
        require_auth(request)  # Require authentication
        
        body = parse_json_body(request)
        warehouse_data = WarehouseCreate(
            warehouse_id=body.get('warehouse_id', ''),
            name=body.get('name', ''),
            location=body.get('location', ''),
            region=body.get('region', ''),
            capacity=body.get('capacity', 0),
            manager_name=body.get('manager_name'),
            contact_phone=body.get('contact_phone')
        )
        
        # Validate input
        is_valid, error_msg = warehouse_data.validate()
        if not is_valid:
            response.status_code = 400
            return create_error_response(error_msg, 400)
        
        db = get_database()
        
        # Check if warehouse already exists
        existing = db.execute_one("SELECT id FROM warehouse WHERE warehouse_id = %s", (warehouse_data.warehouse_id,))
        if existing:
            response.status_code = 400
            return create_error_response("Warehouse ID already exists", 400)
        
        # Create warehouse
        now = datetime.utcnow()
        warehouse_id = db.execute_insert(
            """INSERT INTO warehouse (warehouse_id, name, location, region, capacity, 
                                    current_stock, reserved_stock, available_stock,
                                    manager_name, contact_phone, status, created_at, updated_at)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id""",
            (warehouse_data.warehouse_id, warehouse_data.name, warehouse_data.location, 
             warehouse_data.region, warehouse_data.capacity, 0, 0, 0,
             warehouse_data.manager_name, warehouse_data.contact_phone, 'Active', now, now)
        )
        
        if not warehouse_id:
            response.status_code = 500
            return create_error_response("Failed to create warehouse", 500)
        
        # Return created warehouse
        warehouse = Warehouse(
            id=warehouse_id,
            warehouse_id=warehouse_data.warehouse_id,
            name=warehouse_data.name,
            location=warehouse_data.location,
            region=warehouse_data.region,
            capacity=warehouse_data.capacity,
            current_stock=0,
            reserved_stock=0,
            available_stock=0,
            manager_name=warehouse_data.manager_name,
            contact_phone=warehouse_data.contact_phone,
            status='Active',
            created_at=now,
            updated_at=now
        )
        
        warehouse_dict = warehouse.to_dict()
        warehouse_dict['utilization_percentage'] = warehouse.utilization_percentage
        
        response.status_code = 201
        return create_response(warehouse_dict, "Warehouse created successfully", 201)
        
    except HTTPException as e:
        response.status_code = e.status_code
        return create_error_response(e.detail, e.status_code)
    except Exception as e:
        response.status_code = 500
        return create_error_response("Internal server error", 500)

def update_warehouse(request, response):
    """Update an existing warehouse"""
    try:
        require_auth(request)
        
        warehouse_id = request.path_params.get('id')
        if not warehouse_id:
            response.status_code = 400
            return create_error_response("Warehouse ID is required", 400)
        
        body = parse_json_body(request)
        update_data = WarehouseUpdate(
            name=body.get('name'),
            location=body.get('location'),
            region=body.get('region'),
            capacity=body.get('capacity'),
            current_stock=body.get('current_stock'),
            reserved_stock=body.get('reserved_stock'),
            manager_name=body.get('manager_name'),
            contact_phone=body.get('contact_phone'),
            status=body.get('status')
        )
        
        # Validate input
        is_valid, error_msg = update_data.validate()
        if not is_valid:
            response.status_code = 400
            return create_error_response(error_msg, 400)
        
        db = get_database()
        
        # Check if warehouse exists
        existing = db.execute_one("SELECT id FROM warehouse WHERE warehouse_id = %s", (warehouse_id,))
        if not existing:
            response.status_code = 404
            return create_error_response("Warehouse not found", 404)
        
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
        
        if update_data.capacity is not None:
            update_fields.append("capacity = %s")
            params.append(update_data.capacity)
        
        if update_data.current_stock is not None:
            update_fields.append("current_stock = %s")
            params.append(update_data.current_stock)
        
        if update_data.reserved_stock is not None:
            update_fields.append("reserved_stock = %s")
            params.append(update_data.reserved_stock)
        
        if update_data.manager_name is not None:
            update_fields.append("manager_name = %s")
            params.append(update_data.manager_name)
        
        if update_data.contact_phone is not None:
            update_fields.append("contact_phone = %s")
            params.append(update_data.contact_phone)
        
        if update_data.status is not None:
            update_fields.append("status = %s")
            params.append(update_data.status)
        
        if not update_fields:
            response.status_code = 400
            return create_error_response("No fields to update", 400)
        
        # Calculate available stock if current_stock or reserved_stock is updated
        if update_data.current_stock is not None or update_data.reserved_stock is not None:
            update_fields.append("available_stock = current_stock - reserved_stock")
        
        update_fields.append("updated_at = %s")
        params.append(datetime.utcnow())
        params.append(warehouse_id)
        
        update_query = f"UPDATE warehouse SET {', '.join(update_fields)} WHERE warehouse_id = %s"
        db.execute_query(update_query, tuple(params))
        
        # Return updated warehouse
        row = db.execute_one(
            """SELECT id, warehouse_id, name, location, region, capacity, current_stock, 
                      reserved_stock, available_stock, manager_name, contact_phone, status,
                      created_at, updated_at 
               FROM warehouse WHERE warehouse_id = %s""",
            (warehouse_id,)
        )
        
        warehouse = Warehouse.from_db_row(row)
        warehouse_dict = warehouse.to_dict()
        warehouse_dict['utilization_percentage'] = warehouse.utilization_percentage
        
        return create_response(warehouse_dict, "Warehouse updated successfully")
        
    except HTTPException as e:
        response.status_code = e.status_code
        return create_error_response(e.detail, e.status_code)
    except Exception as e:
        response.status_code = 500
        return create_error_response("Internal server error", 500)

def delete_warehouse(request, response):
    """Delete a warehouse"""
    try:
        require_auth(request)
        
        warehouse_id = request.path_params.get('id')
        if not warehouse_id:
            response.status_code = 400
            return create_error_response("Warehouse ID is required", 400)
        
        db = get_database()
        
        # Check if warehouse exists
        existing = db.execute_one("SELECT id FROM warehouse WHERE warehouse_id = %s", (warehouse_id,))
        if not existing:
            response.status_code = 404
            return create_error_response("Warehouse not found", 404)
        
        # Delete warehouse (cascade will handle related data)
        db.execute_query("DELETE FROM warehouse WHERE warehouse_id = %s", (warehouse_id,))
        
        return create_response(None, "Warehouse deleted successfully")
        
    except HTTPException as e:
        response.status_code = e.status_code
        return create_error_response(e.detail, e.status_code)
    except Exception as e:
        response.status_code = 500
        return create_error_response("Internal server error", 500)

def get_warehouse_supplies(request, response):
    """Get supply operations for a specific warehouse"""
    try:
        warehouse_id = request.path_params.get('id')
        if not warehouse_id:
            response.status_code = 400
            return create_error_response("Warehouse ID is required", 400)
        
        query_params = getattr(request, 'query_params', {})
        limit = int(query_params.get('limit', 100))
        
        db = get_database()
        
        # Check if warehouse exists
        existing = db.execute_one("SELECT id FROM warehouse WHERE warehouse_id = %s", (warehouse_id,))
        if not existing:
            response.status_code = 404
            return create_error_response("Warehouse not found", 404)
        
        # Get supply operations
        rows = db.execute_query(
            """SELECT id, warehouse_id, sto_id, supply_date, quantity_supplied, supply_type,
                      status, estimated_delivery, actual_delivery, notes, created_at, updated_at
               FROM supply_warehouse 
               WHERE warehouse_id = %s 
               ORDER BY supply_date DESC 
               LIMIT %s""",
            (warehouse_id, limit)
        )
        
        supplies = [SupplyWarehouse.from_db_row(row).to_dict() for row in rows]
        
        return create_response(supplies, "Supply operations retrieved successfully")
        
    except Exception as e:
        response.status_code = 500
        return create_error_response("Internal server error", 500)

def create_supply_operation(request, response):
    """Create a new supply operation"""
    try:
        require_auth(request)
        
        body = parse_json_body(request)
        supply_data = SupplyWarehouseCreate(
            warehouse_id=body.get('warehouse_id', ''),
            sto_id=body.get('sto_id', ''),
            quantity_supplied=body.get('quantity_supplied', 0),
            supply_type=body.get('supply_type', 'Regular'),
            estimated_delivery=body.get('estimated_delivery'),
            notes=body.get('notes', '')
        )
        
        # Validate input
        is_valid, error_msg = supply_data.validate()
        if not is_valid:
            response.status_code = 400
            return create_error_response(error_msg, 400)
        
        db = get_database()
        
        # Check if warehouse and STO exist
        warehouse_exists = db.execute_one("SELECT id FROM warehouse WHERE warehouse_id = %s", (supply_data.warehouse_id,))
        if not warehouse_exists:
            response.status_code = 400
            return create_error_response("Warehouse not found", 400)
        
        sto_exists = db.execute_one("SELECT id FROM sto WHERE sto_id = %s", (supply_data.sto_id,))
        if not sto_exists:
            response.status_code = 400
            return create_error_response("STO not found", 400)
        
        # Parse estimated delivery if provided
        estimated_delivery = None
        if supply_data.estimated_delivery:
            try:
                estimated_delivery = datetime.fromisoformat(supply_data.estimated_delivery.replace('Z', '+00:00'))
            except ValueError:
                response.status_code = 400
                return create_error_response("Invalid estimated delivery date format", 400)
        
        # Create supply operation
        now = datetime.utcnow()
        supply_id = db.execute_insert(
            """INSERT INTO supply_warehouse (warehouse_id, sto_id, supply_date, quantity_supplied,
                                           supply_type, status, estimated_delivery, notes, created_at, updated_at)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id""",
            (supply_data.warehouse_id, supply_data.sto_id, now, supply_data.quantity_supplied,
             supply_data.supply_type, 'Pending', estimated_delivery, supply_data.notes, now, now)
        )
        
        if not supply_id:
            response.status_code = 500
            return create_error_response("Failed to create supply operation", 500)
        
        # Update warehouse stock (reserve the quantity)
        db.execute_query(
            "UPDATE warehouse SET reserved_stock = reserved_stock + %s, available_stock = current_stock - reserved_stock WHERE warehouse_id = %s",
            (supply_data.quantity_supplied, supply_data.warehouse_id)
        )
        
        # Return created supply operation
        supply = SupplyWarehouse(
            id=supply_id,
            warehouse_id=supply_data.warehouse_id,
            sto_id=supply_data.sto_id,
            supply_date=now,
            quantity_supplied=supply_data.quantity_supplied,
            supply_type=supply_data.supply_type,
            status='Pending',
            estimated_delivery=estimated_delivery,
            notes=supply_data.notes,
            created_at=now,
            updated_at=now
        )
        
        response.status_code = 201
        return create_response(supply.to_dict(), "Supply operation created successfully", 201)
        
    except HTTPException as e:
        response.status_code = e.status_code
        return create_error_response(e.detail, e.status_code)
    except Exception as e:
        response.status_code = 500
        return create_error_response("Internal server error", 500)