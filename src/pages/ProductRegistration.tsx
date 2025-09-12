import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Package, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'qrcode';

export const ProductRegistration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const productData = {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      origin: formData.get('origin') as string,
      harvestDate: formData.get('harvestDate') as string,
      quantity: formData.get('quantity') as string,
    };

    try {
      // Mock API call - replace with actual API
      const productId = Date.now().toString();
      
      // Generate QR code
      const qrData = JSON.stringify({
        productId,
        name: productData.name,
        trackingUrl: `${window.location.origin}/track/${productId}`
      });
      
      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#2d5016', // agri-green
          light: '#FFFFFF'
        }
      });
      
      setQrCodeData(qrCodeDataUrl);
      toast.success('Product registered successfully!');
    } catch (error) {
      toast.error('Failed to register product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.download = 'product-qr-code.png';
    link.href = qrCodeData;
    link.click();
  };

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
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Register New Product
          </h1>
          <p className="text-muted-foreground">
            Add your product details to generate a QR code for tracking
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Registration Form */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-agri-green" />
                Product Information
              </CardTitle>
              <CardDescription>
                Enter the details of your agricultural product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Organic Tomatoes"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="grains">Grains</SelectItem>
                        <SelectItem value="herbs">Herbs</SelectItem>
                        <SelectItem value="dairy">Dairy</SelectItem>
                        <SelectItem value="meat">Meat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Brief description of the product"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Farm/Origin</Label>
                    <Input
                      id="origin"
                      name="origin"
                      placeholder="e.g., Green Valley Farm"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="harvestDate">Harvest Date</Label>
                    <Input
                      id="harvestDate"
                      name="harvestDate"
                      type="date"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    placeholder="e.g., 50 kg"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-agri-green to-agri-green-light hover:from-agri-green/90 hover:to-agri-green-light/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Registering...' : 'Register Product'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* QR Code Display */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-agri-gold" />
                Generated QR Code
              </CardTitle>
              <CardDescription>
                {qrCodeData ? 'Your product QR code is ready!' : 'QR code will appear after registration'}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              {qrCodeData ? (
                <>
                  <div className="p-4 bg-white rounded-lg shadow-soft">
                    <img 
                      src={qrCodeData} 
                      alt="Product QR Code" 
                      className="w-64 h-64"
                    />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Scan this QR code to track your product
                    </p>
                    <Button onClick={downloadQRCode} variant="outline">
                      Download QR Code
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center w-64 h-64 bg-muted rounded-lg">
                  <QrCode className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};