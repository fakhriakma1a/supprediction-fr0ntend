import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <Card className="chart-shadow rounded-3xl bg-white">
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <div className="w-24 h-24 bg-sup-light-gray rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-sup-dark-gray"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h1 className="font-poppins text-5xl font-bold text-black mb-4">
                  {title}
                </h1>

                <p className="font-poppins text-2xl text-sup-dark-gray mb-8">
                  {description}
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-8">
                <h3 className="font-poppins text-xl font-semibold text-blue-800 mb-4">
                  Coming Soon
                </h3>
                <p className="font-poppins text-blue-700 leading-relaxed">
                  This feature is currently under development. Please continue
                  prompting to help build out the specific functionality you
                  need for this section of the SUPPrediction system.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
