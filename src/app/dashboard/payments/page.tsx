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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Payment Methods</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Method
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Saved Methods</CardTitle>
          <CardDescription>Manage your saved credit and debit cards.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {paymentMethods.map((method) => (
              <li key={method.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  {getCardIcon(method.type)}
                  <div>
                    <p className="font-medium flex items-center gap-2">
                        {method.type} ending in {method.last4}
                        {method.isDefault && <Badge variant="secondary">Default</Badge>}
                    </p>
                    <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                    {!method.isDefault && <Button variant="outline" size="sm">Set as default</Button>}
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Remove</Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
