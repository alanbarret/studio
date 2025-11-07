import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, CreditCard } from 'lucide-react';
import { paymentMethods } from '@/lib/data';

function getCardIcon(type: string) {
    return <CreditCard className="h-8 w-8 text-muted-foreground" />;
}

export default function PaymentsPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Payment Methods</h1>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <Card key={method.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getCardIcon(method.type)}
                <div>
                  <p className="font-medium flex items-center gap-2">
                      {method.type} •••• {method.last4}
                      {method.isDefault && <Badge variant="secondary">Default</Badge>}
                  </p>
                  <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                </div>
              </div>
              {!method.isDefault && <Button variant="ghost" size="sm">Set default</Button>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
