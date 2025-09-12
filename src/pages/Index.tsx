import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, QrCode, Truck, Shield, Users, TrendingUp, Package } from 'lucide-react';

const Index = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-sky via-background to-agri-green/10">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-agri-green to-agri-green-light shadow-strong">
              <Leaf className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Track Your Food's Journey
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            AgriTrace provides complete transparency from farm to table. Scan QR codes to discover the story behind your food.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/auth')}
              size="lg"
              className="bg-gradient-to-r from-agri-green to-agri-green-light hover:from-agri-green/90 hover:to-agri-green-light/90 text-lg px-8"
            >
              Get Started as Farmer
            </Button>
            <Button 
              onClick={() => navigate('/scanner')}
              variant="outline"
              size="lg"
              className="text-lg px-8 border-agri-green text-agri-green hover:bg-agri-green hover:text-primary-foreground"
            >
              <QrCode className="mr-2 h-5 w-5" />
              Scan Product
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="shadow-medium hover:shadow-strong transition-shadow">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-agri-green/10 mb-4">
                <QrCode className="h-6 w-6 text-agri-green" />
              </div>
              <CardTitle>QR Code Tracking</CardTitle>
              <CardDescription>
                Generate unique QR codes for every product and track their complete journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Instant QR code generation</li>
                <li>• Real-time tracking updates</li>
                <li>• Mobile-friendly scanning</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium hover:shadow-strong transition-shadow">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-agri-gold/10 mb-4">
                <Truck className="h-6 w-6 text-agri-gold" />
              </div>
              <CardTitle>Supply Chain Visibility</CardTitle>
              <CardDescription>
                Complete transparency across the entire supply chain from farm to consumer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Farm origin tracking</li>
                <li>• Processing milestones</li>
                <li>• Distribution timeline</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-medium hover:shadow-strong transition-shadow">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-agri-green-light/10 mb-4">
                <Shield className="h-6 w-6 text-agri-green-light" />
              </div>
              <CardTitle>Food Safety</CardTitle>
              <CardDescription>
                Ensure food safety with detailed records and quality checkpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Quality inspections</li>
                <li>• Safety certifications</li>
                <li>• Recall management</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-card rounded-2xl p-8 shadow-medium">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Trusted by Agricultural Leaders
            </h2>
            <p className="text-muted-foreground">
              Join thousands of farmers and distributors using AgriTrace
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-agri-green" />
              </div>
              <div className="text-3xl font-bold text-agri-green mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Active Farmers</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Package className="h-8 w-8 text-agri-gold" />
              </div>
              <div className="text-3xl font-bold text-agri-gold mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Products Tracked</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-agri-green-light" />
              </div>
              <div className="text-3xl font-bold text-agri-green-light mb-1">99%</div>
              <div className="text-sm text-muted-foreground">Traceability Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-agri-green to-agri-green-light">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">AgriTrace</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 AgriTrace. Connecting farms to tables with transparency.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
