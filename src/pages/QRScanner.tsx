import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, QrCode, Scan, Type } from 'lucide-react';
import { toast } from 'sonner';
import QrScanner from 'qr-scanner';

export const QRScanner = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [manualInput, setManualInput] = useState('');

  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      if (!videoRef.current) return;

      // Check camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the test stream
      
      setHasPermission(true);
      
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          handleQRResult(result.data);
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      
      qrScannerRef.current = qrScanner;
      await qrScanner.start();
      setIsScanning(true);
      toast.success('Camera started. Point at a QR code to scan.');
    } catch (error) {
      console.error('Camera access error:', error);
      setHasPermission(false);
      toast.error('Camera access denied. Please use manual input instead.');
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      setIsScanning(false);
    }
  };

  const handleQRResult = (data: string) => {
    try {
      // Try to parse the QR data
      const parsed = JSON.parse(data);
      if (parsed.productId) {
        toast.success('Product found! Redirecting...');
        navigate(`/product/${parsed.productId}`);
      } else {
        // Fallback: treat as direct product ID
        toast.success('Product found! Redirecting...');
        navigate(`/product/${data}`);
      }
    } catch {
      // If not JSON, treat as direct product ID
      toast.success('Product found! Redirecting...');
      navigate(`/product/${data}`);
    }
    stopScanning();
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      toast.success('Searching for product...');
      navigate(`/product/${manualInput.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-sky via-background to-agri-green/5">
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-agri-green to-agri-green-light shadow-medium">
              <QrCode className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Product Scanner</h1>
          <p className="text-muted-foreground">Scan a QR code to trace your product's journey</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* QR Scanner */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-agri-green" />
                QR Code Scanner
              </CardTitle>
              <CardDescription>
                Use your device's camera to scan product QR codes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <video
                  ref={videoRef}
                  className="w-full max-w-md mx-auto rounded-lg bg-muted"
                  style={{ aspectRatio: '1/1' }}
                />
                {!isScanning && hasPermission !== false && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
                    <div className="text-center">
                      <Scan className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Camera preview will appear here</p>
                    </div>
                  </div>
                )}
                {hasPermission === false && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
                    <div className="text-center">
                      <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Camera access required for scanning</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center gap-4">
                {!isScanning ? (
                  <Button 
                    onClick={startScanning}
                    className="bg-gradient-to-r from-agri-green to-agri-green-light hover:from-agri-green/90 hover:to-agri-green-light/90"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Start Camera
                  </Button>
                ) : (
                  <Button 
                    onClick={stopScanning}
                    variant="outline"
                  >
                    Stop Camera
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Manual Input */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5 text-agri-gold" />
                Manual Input
              </CardTitle>
              <CardDescription>
                Enter a product ID manually if you can't use the camera
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="productId">Product ID</Label>
                  <Input
                    id="productId"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="Enter product ID or QR code data"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-agri-gold to-agri-earth hover:from-agri-gold/90 hover:to-agri-earth/90"
                  disabled={!manualInput.trim()}
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  Track Product
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="shadow-soft border-agri-green/20 bg-agri-green/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-agri-green">How to use AgriTrace Scanner</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>1. Click "Start Camera" to activate your device's camera</p>
                  <p>2. Point your camera at the QR code on the product packaging</p>
                  <p>3. The scanner will automatically detect and process the code</p>
                  <p>4. View the complete journey of your product!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};