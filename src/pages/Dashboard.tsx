import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Package, QrCode, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  category: string;
  status: 'harvested' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  qrCode: string;
}

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Mock data - replace with API call
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Organic Tomatoes',
        category: 'Vegetables',
        status: 'delivered',
        createdAt: '2024-01-15',
        qrCode: 'QR001'
      },
      {
        id: '2',
        name: 'Fresh Lettuce',
        category: 'Vegetables',
        status: 'shipped',
        createdAt: '2024-01-14',
        qrCode: 'QR002'
      },
      {
        id: '3',
        name: 'Sweet Corn',
        category: 'Vegetables',
        status: 'processing',
        createdAt: '2024-01-13',
        qrCode: 'QR003'
      }
    ];
    setProducts(mockProducts);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'harvested': return 'bg-agri-earth/20 text-agri-earth';
      case 'processing': return 'bg-agri-gold/20 text-agri-gold';
      case 'shipped': return 'bg-agri-green/20 text-agri-green';
      case 'delivered': return 'bg-agri-green-light/20 text-agri-green-light';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Track and manage your agricultural products
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-agri-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-agri-green">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">QR Codes Generated</CardTitle>
              <QrCode className="h-4 w-4 text-agri-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-agri-gold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                All products tracked
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
              <TrendingUp className="h-4 w-4 text-agri-green-light" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-agri-green-light">
                {products.filter(p => p.status === 'shipped').length}
              </div>
              <p className="text-xs text-muted-foreground">
                In transit now
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-foreground">Your Products</h2>
            <Button 
              onClick={() => navigate('/register-product')}
              className="bg-gradient-to-r from-agri-green to-agri-green-light hover:from-agri-green/90 hover:to-agri-green-light/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span className="text-lg">{product.name}</span>
                    <Badge variant="secondary" className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{product.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Created: {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};