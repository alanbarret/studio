import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlaceholderPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookings</CardTitle>
        <CardDescription>This page is under construction.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Check back later to manage your bookings.</p>
      </CardContent>
    </Card>
  );
}