'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

import { PlusCircle, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import type { SubscriptionPlan, Benefit } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

type ProductFormData = Omit<SubscriptionPlan, '_id' | 'createdAt' | 'updatedAt' | '__v' | 'deletedAt' | 'benefits'> & {
  benefits: Array<Omit<Benefit, '_id'>>;
};

const initialFormData: ProductFormData = {
    name: '',
    serviceName: 'car-wash',
    type: 'subscribe',
    carType: 'saloon',
    price: 0,
    active: true,
    frequencyPerWeek: 1,
    subscriptionDurationInMonths: 1,
    benefits: [{ title: '', logo: '' }],
};


export default function ProductsPage() {
  const [products, setProducts] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SubscriptionPlan | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<SubscriptionPlan | null>(null);
  
  const { toast } = useToast();

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://maison-saner-roni.ngrok-free.dev/products?serviceName=car-wash&type=subscribe&active=true', {
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
         toast({ variant: 'destructive', title: 'Could not fetch products.', description: 'The server responded with an error.' });
      }
    } catch (error) {
       toast({ variant: 'destructive', title: 'An error occurred.', description: 'Please check the console for more details.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number';
    setFormData(prev => ({ ...prev, [name]: isNumber ? Number(value) : value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, active: checked }));
  };

  const handleBenefitChange = (index: number, field: keyof Omit<Benefit, '_id'>, value: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index][field] = value;
    setFormData(prev => ({ ...prev, benefits: newBenefits }));
  };

  const addBenefitField = () => {
    setFormData(prev => ({ ...prev, benefits: [...prev.benefits, { title: '', logo: '' }] }));
  };

  const removeBenefitField = (index: number) => {
    const newBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, benefits: newBenefits }));
  };

  const handleOpenForm = (product: SubscriptionPlan | null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
          ...product,
          benefits: product.benefits.map(b => ({title: b.title, logo: b.logo}))
      });
    } else {
      setEditingProduct(null);
      setFormData(initialFormData);
    }
    setIsFormOpen(true);
  };
  
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async () => {
    const url = editingProduct
      ? `https://maison-saner-roni.ngrok-free.dev/products/${editingProduct._id}`
      : 'https://maison-saner-roni.ngrok-free.dev/products';
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "69420"
        },
        body: JSON.stringify(formData),
      });

      if(response.ok) {
        toast({ title: `Product ${editingProduct ? 'updated' : 'created'} successfully` });
        handleCloseForm();
        fetchProducts();
      } else {
        const errorData = await response.json();
        toast({ variant: 'destructive', title: 'An error occurred.', description: errorData.message || 'Could not save the product.' });
      }
      
    } catch (error) {
      toast({ variant: 'destructive', title: 'An error occurred.' });
    }
  };

 const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`https://maison-saner-roni.ngrok-free.dev/products/${productToDelete._id}`, {
        method: 'DELETE',
        headers: {
          "ngrok-skip-browser-warning": "69420",
        }
      });

      if (response.ok) {
         toast({ title: 'Product deleted successfully' });
         fetchProducts();
      } else {
         toast({ variant: 'destructive', title: 'Could not delete product.' });
      }

    } catch (error) {
      toast({ variant: 'destructive', title: 'An error occurred while deleting.' });
    } finally {
        setIsDeleteDialogOpen(false);
        setProductToDelete(null);
    }
  };

  const openDeleteDialog = (product: SubscriptionPlan) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your subscription plans.</p>
        </div>
        <Button onClick={() => handleOpenForm(null)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Car Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} className="text-center">Loading...</TableCell></TableRow>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.carType}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.active ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenForm(product)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openDeleteDialog(product)} className="text-red-600">
                             <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={5} className="text-center">No products found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Create Product'}</DialogTitle>
            <DialogDescription>
              Fill in the details for the subscription plan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleFormChange} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carType" className="text-right">Car Type</Label>
              <Input id="carType" name="carType" value={formData.carType} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price</Label>
              <Input id="price" name="price" type="number" value={formData.price} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequencyPerWeek" className="text-right">Washes/Week</Label>
              <Input id="frequencyPerWeek" name="frequencyPerWeek" type="number" value={formData.frequencyPerWeek} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subscriptionDurationInMonths" className="text-right">Duration (Months)</Label>
              <Input id="subscriptionDurationInMonths" name="subscriptionDurationInMonths" type="number" value={formData.subscriptionDurationInMonths} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="active" className="text-right">Active</Label>
              <Checkbox id="active" checked={formData.active} onCheckedChange={handleCheckboxChange} />
            </div>

            <h4 className="font-medium text-center col-span-4 mt-4">Benefits</h4>
            {formData.benefits.map((benefit, index) => (
                <div key={index} className="grid grid-cols-4 items-center gap-4 relative">
                    <Label htmlFor={`benefit-title-${index}`} className="text-right">Title</Label>
                    <Input id={`benefit-title-${index}`} value={benefit.title} onChange={(e) => handleBenefitChange(index, 'title', e.target.value)} className="col-span-2" />
                    <div className="col-span-1 flex items-center">
                        <Input placeholder="Logo" value={benefit.logo} onChange={(e) => handleBenefitChange(index, 'logo', e.target.value)} className="w-1/2 mr-2" />
                        <Button variant="ghost" size="icon" onClick={() => removeBenefitField(index)} disabled={formData.benefits.length <= 1}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}
            <div className="col-span-4 flex justify-center">
                <Button variant="outline" size="sm" onClick={addBenefitField}>Add Benefit</Button>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleSubmit}>Save Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the product
              "{productToDelete?.name}".
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

    
