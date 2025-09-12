import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, Calendar, Package, Truck, CheckCircle } from 'lucide-react';

interface ProductHistory {
  id: string;
  action: string;
  location: string;
  date: string;
  details: string;
  status: 'completed' | 'current' | 'pending';
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  origin: string;
  harvestDate: string;
  quantity: string;
  currentStatus: string;
  history: ProductHistory[];
}

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock API call - replace with actual API
    const mockProduct: Product = {
      id: id || '1',
      name: 'Organic Tomatoes',
      category: 'Vegetables',
      description: 'Fresh organic tomatoes grown without pesticides in our sustainable farm.',
      origin: 'Green Valley Farm',
      harvestDate: '2024-01-15',
      quantity: '50 kg',
      currentStatus: 'delivered',
      history: [
        {
          id: '1',
          action: 'Harvested',
          location: 'Green Valley Farm, California',
          date: '2024-01-15T08:00:00Z',
          details: 'Tomatoes harvested at peak ripeness',
          status: 'completed'
        },
        {
          id: '2',
          action: 'Processed & Packaged',
          location: 'Farm Processing Center',
          date: '2024-01-15T14:00:00Z',
          details: 'Cleaned, sorted, and packaged for distribution',
          status: 'completed'
        },
        {
          id: '3',
          action: 'Quality Check',
          location: 'Green Valley Farm',
          date: '2024-01-15T16:00:00Z',
          details: 'Passed all quality and safety inspections',
          status: 'completed'
        },
        {
          id: '4',
          action: 'Shipped',
          location: 'Distribution Center, Los Angeles',
          date: '2024-01-16T09:00:00Z',
          details: 'Loaded onto refrigerated truck for delivery',
          status: 'completed'
        },
        {
          id: '5',
          action: 'Delivered',
          location: 'Fresh Market Grocery Store',
          date: '2024-01-16T15:00:00Z',
          details: 'Successfully delivered to retail location',
          status: 'completed'
        }
      ]
    };
    
    setTimeout(() => {
      setProduct(mockProduct);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-agri-green" />;
      case 'current': return <Truck className="h-5 w-5 text-agri-gold" />;
      case 'pending': return <Package className="h-5 w-5 text-muted-foreground" />;
      default: return <Package className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'harvested': return 'bg-agri-earth/20 text-agri-earth';
      case 'processing': return 'bg-agri-gold/20 text-agri-gold';
      case 'shipped': return 'bg-agri-green/20 text-agri-green';
      case 'delivered': return 'bg-agri-green-light/20 text-agri-green-light';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto p-6">
          <div className="text-center">Loading product details...</div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto p-6">
          <div className="text-center">Product not found</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{product.name}</span>
                  <Badge className={getStatusColor(product.currentStatus)}>
                    {product.currentStatus}
                  </Badge>
                </CardTitle>
                <CardDescription>{product.category}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-agri-green" />
                    <div>
                      <p className="text-sm font-medium">Origin</p>
                      <p className="text-sm text-muted-foreground">{product.origin}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-agri-gold" />
                    <div>
                      <p className="text-sm font-medium">Harvest Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(product.harvestDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-agri-green-light" />
                    <div>
                      <p className="text-sm font-medium">Quantity</p>
                      <p className="text-sm text-muted-foreground">{product.quantity}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Journey Timeline */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Product Journey</CardTitle>
                <CardDescription>
                  Track the complete journey from farm to table
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {product.history.map((event, index) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        {getStatusIcon(event.status)}
                        {index < product.history.length - 1 && (
                          <div className="w-px h-12 bg-border mt-2" />
                        )}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-foreground">
                            {event.action}
                          </h3>
                          <time className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleString()}
                          </time>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {event.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};