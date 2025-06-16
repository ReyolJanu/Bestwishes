"use client"

import { useState, useEffect, useCallback } from "react"
import { CalendarIcon, Upload, X, Plus, Save, Eye, Copy, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { useLoading } from '../../hooks/useLoading'
import Loader from '../loader/page'
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"

import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Switch } from "../../../components/ui/switch"
import { Badge } from "../../../components/ui/badge"
import { Calendar } from "../../../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover"
import { Checkbox } from "../../../components/ui/checkbox"
import { Separator } from "../../../components/ui/separator"
import { cn } from "../../../lib/utils"
import ProductPreviewModalComponent from "../preview/page"

// Update category options to match backend schema
const categoryOptions = [
  "Balloon",
  "Card",
  "Gift Box",
  "Cake Topper",
  "Decoration Item",
  "Photo Frame",
  "Mug",
  "Toy",
  "Other"
]

// Update event options to match backend schema
const eventOptions = [
  "Anniversary",
  "Birthday",
  "British Souvenir",
  "Christmas",
  "Easter",
  "Father's Day",
  "Mother's Day",
  "Halloween",
  "Teachers & Graduation",
  "Valentine's Day",
  "Wedding",
  "Other"
]

const relationOptions = [
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Friend",
  "Grandfather",
  "Grandmother",
  "Husband",
  "Wife",
  "Other"
]

const materialOptions = [
  "Foil",
  "Latex",
  "Paper",
  "Plastic",
  "Ceramic",
  "Wood",
  "Other"
]

const sizeOptions = [
  "Small",
  "Medium",
  "Large",
  "Extra Large"
]

const typeOptions = [
  "Helium Balloon",
  "Air Balloon",
  "Pop-up Card",
  "Musical Card",
  "LED Gift",
  "Customizable",
  "Combo",
  "Other"
]

const rentTypeOptions = [
  "none",
  "daily",
  "weekly",
  "monthly"
]

const recipientOptions = ["Mum", "Dad", "Sister", "Brother", "Friend", "Partner", "Colleague", "Teacher", "Boss"]

const themeOptions = ["Humour", "Sentimental", "Inspirational", "Cute", "Elegant", "Modern", "Vintage", "Minimalist"]

const productTypeOptions = ["Mug", "Money Wallet", "Keyring", "Coaster", "Notebook", "Card", "Frame", "Cushion"]

const seasonOptions = [
  "Spring 2025",
  "Summer 2025",
  "Autumn 2025",
  "Winter 2025",
  "Holiday 2024",
  "Back to School 2025",
]

const brandOptions = ["CozyMugs", "Artisan Co.", "Creative Cards", "Home Essentials", "Gift Gallery"]

const roomOptions = ["Kitchen", "Living Room", "Bedroom", "Office", "Bathroom", "Garden", "Dining Room"]

const statusOptions = ["Draft", "Published", "Archived", "Pending Review", "Scheduled"]

const stockStatusOptions = ["In Stock", "Low Stock", "Out of Stock", "Backordered"]

const shippingClassOptions = ["Free Shipping", "Standard", "Fragile", "Oversize", "Express"]

const taxClassOptions = ["VAT (15%)", "GST (10%)", "Exempt", "Reduced Rate"]

// Add image compression utility
const compressImage = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions (max 800px on longest side)
        const MAX_SIZE = 800;
        if (width > height && width > MAX_SIZE) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob with reduced quality
        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            }));
          },
          'image/jpeg',
          0.7 // quality
        );
      };
    };
  });
};

export default function AdminProductManager() {
  const { user } = useSelector(state => state.userState);
  const router = useRouter();
  const { loading, withLoading } = useLoading();
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    mainCategory: "",
    facets: {
      events: [],
      relation: "",
      material: "",
      size: "",
      color: "",
      type: ""
    },
    price: 0,
    imageUrls: [],
    stock: 0,
    isAvailable: true,
    rating: 0,
    rentType: "none"
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedRecipients, setSelectedRecipients] = useState([])
  const [selectedThemes, setSelectedThemes] = useState([])
  const [selectedProductTypes, setSelectedProductTypes] = useState([])
  const [selectedSeasons, setSelectedSeasons] = useState([])
  const [selectedRooms, setSelectedRooms] = useState([])
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")
  const [saleStartDate, setSaleStartDate] = useState()
  const [saleEndDate, setSaleEndDate] = useState()
  const [variants, setVariants] = useState([])
  const [showPreview, setShowPreview] = useState(false)
  const [selectedRelation, setSelectedRelation] = useState("")
  const [selectedMaterial, setSelectedMaterial] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedRentType, setSelectedRentType] = useState("none")
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleMultiSelectToggle = (value, selectedValues, setSelectedValues) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((item) => item !== value))
    } else {
      setSelectedValues([...selectedValues, value])
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: Date.now().toString(),
        attribute: "",
        options: [],
      },
    ])
  }

  const removeVariant = (id) => {
    setVariants(variants.filter((variant) => variant.id !== id))
  }

  const MultiSelectField = ({ label, options, selectedValues, onToggle }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="border rounded-md p-3 max-h-32 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`${label}-${option}`}
                checked={selectedValues.includes(option)}
                onCheckedChange={() => onToggle(option)}
              />
              <Label htmlFor={`${label}-${option}`} className="text-sm font-normal cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedValues.map((value) => (
            <Badge key={value} variant="secondary" className="text-xs">
              {value}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )

  useEffect(() => {
    const fetchProducts = async () => {
      await withLoading(async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
          const data = await response.json()
          setProducts(data)
        } catch (error) {
          console.error('Error fetching products:', error)
        }
      })
    }

    fetchProducts()
  }, [withLoading])

  const handleProductUpdate = async (productId, updates) => {
    await withLoading(async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        })
        
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product.id === productId ? { ...product, ...updates } : product
          )
        )
      } catch (error) {
        console.error('Error updating product:', error)
      }
    })
  }

  const handleProductDelete = async (productId) => {
    await withLoading(async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
          method: 'DELETE',
        })
        
        setProducts(prevProducts => 
          prevProducts.filter(product => product.id !== productId)
        )
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    })
  }

  // Add test product function
  const createTestProduct = () => {
    const testProduct = {
      title: "Birthday Balloon Set",
      description: "Colorful birthday balloon set with helium, perfect for celebrations",
      mainCategory: "Balloon",
      facets: {
        events: ["Birthday"],
        relation: "Friend",
        material: "Latex",
        size: "Medium",
        color: "Multi-color",
        type: "Helium Balloon"
      },
      price: 19.99,
      imageUrls: ["https://example.com/balloon1.jpg"],
      stock: 50,
      isAvailable: true,
      rentType: "none"
    };

    setProductData(testProduct);
    setSelectedEvents(["Birthday"]);
    setSelectedRelation("Friend");
    setSelectedMaterial("Latex");
    setSelectedSize("Medium");
    setSelectedColor("Multi-color");
    setSelectedType("Helium Balloon");
    setSelectedRentType("none");
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    setIsUploading(true);

    try {
      // Compress each image
      const compressedFiles = await Promise.all(
        files.map(file => compressImage(file))
      );
      
      // Create object URLs for preview
      const imageUrls = compressedFiles.map(file => URL.createObjectURL(file));
      
      setUploadedImages(prev => [...prev, ...compressedFiles]);
      setProductData(prev => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...imageUrls]
      }));
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Failed to process images. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setProductData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }));
  };

  // Update the media tab content
  const renderMediaTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Media</CardTitle>
        <CardDescription>Upload product images</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Product Images *</Label>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop your product images
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supported formats: JPG, PNG, GIF (max 5MB each)
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Choose Files'}
              </Button>
            </label>
          </div>

          {/* Image Preview Grid */}
          {productData.imageUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {productData.imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square relative overflow-hidden rounded-lg border">
                    <img
                      src={url}
                      alt={`Product ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {uploadedImages[index]?.name || `Image ${index + 1}`}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const handleSubmit = async () => {
    // Validate required fields
    if (!productData.title || !productData.description || !productData.mainCategory || 
        !productData.price || !uploadedImages || uploadedImages.length === 0) {
      alert("Please fill all required fields: Title, Description, Main Category, Price, and at least one image");
      return;
    }

    // Validate numeric fields
    if (isNaN(Number(productData.price)) || Number(productData.price) <= 0) {
      alert("Please enter a valid price");
      return;
    }

    if (isNaN(Number(productData.stock)) || Number(productData.stock) < 0) {
      alert("Please enter a valid stock quantity");
      return;
    }

    // Check if user is logged in
    if (!user) {
      alert('Please log in to add products');
      router.push('/login');
      return;
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      alert('Only admin users can add products');
      return;
    }

    await withLoading(async () => {
      try {
        // Create FormData for multipart/form-data upload
        const formData = new FormData();
        
        // Add product data
        formData.append('title', productData.title);
        formData.append('description', productData.description);
        formData.append('mainCategory', productData.mainCategory);
        formData.append('price', String(productData.price));
        formData.append('stock', String(productData.stock));
        formData.append('isAvailable', String(productData.isAvailable));
        formData.append('rentType', productData.rentType);
        
        // Add facets as a JSON string
        const facetsData = {
          events: selectedEvents,
          relation: selectedRelation,
          material: selectedMaterial,
          size: selectedSize,
          color: selectedColor,
          type: selectedType
        };
        formData.append('facets', JSON.stringify(facetsData));

        // Add images
        uploadedImages.forEach((file, index) => {
          formData.append('images', file);
        });

        console.log('Submitting product with data:', {
          title: productData.title,
          description: productData.description,
          mainCategory: productData.mainCategory,
          price: productData.price,
          stock: productData.stock,
          facets: facetsData,
          imageCount: uploadedImages.length
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addProduct`, {
          method: 'POST',
          credentials: 'include',
          body: formData
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          console.error('Server response:', data);
          
          if (response.status === 401) {
            router.push('/login');
            throw new Error('Session expired. Please log in again.');
          } else if (response.status === 403) {
            throw new Error('Only admin users can add products');
          } else if (response.status === 413) {
            throw new Error('Images are too large. Please try uploading smaller images.');
          } else {
            throw new Error(data.message || 'Failed to create product');
          }
        }

        const data = await response.json();
        console.log('Product created successfully:', data);
        alert('Product created successfully!');
        
        // Reset form
        setProductData({
          title: "",
          description: "",
          mainCategory: "",
          facets: {
            events: [],
            relation: "",
            material: "",
            size: "",
            color: "",
            type: ""
          },
          price: 0,
          imageUrls: [],
          stock: 0,
          isAvailable: true,
          rating: 0,
          rentType: "none"
        });
        setSelectedEvents([]);
        setSelectedRelation("");
        setSelectedMaterial("");
        setSelectedSize("");
        setSelectedColor("");
        setSelectedType("");
        setSelectedRentType("none");
        setUploadedImages([]);

        // Refresh products list
        const productsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/getAllProducts`, {
          credentials: 'include'
        });
        const productsData = await productsResponse.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Error creating product:', error);
        alert(error.message || 'Failed to create product. Please try again.');
      }
    });
  };

  return (
    <>
      {loading && <Loader />}
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Manage Products</h1>
            <p className="text-muted-foreground">Create and edit product information</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={createTestProduct}>
              <Plus className="w-4 h-4 mr-2" />
              Load Test Product
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowPreview(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSubmit}>
              <Save className="w-4 h-4 mr-2" />
              Save Product
            </Button>
          </div>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Essential product details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Product Title *</Label>
                  <Input 
                    id="title" 
                    value={productData.title}
                    onChange={(e) => setProductData({...productData, title: e.target.value})}
                    placeholder="Enter product title" 
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description"
                    value={productData.description}
                    onChange={(e) => setProductData({...productData, description: e.target.value})}
                    placeholder="Enter product description"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mainCategory">Main Category *</Label>
                  <Select 
                    value={productData.mainCategory}
                    onValueChange={(value) => setProductData({...productData, mainCategory: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input 
                    id="price" 
                    type="number"
                    value={productData.price}
                    onChange={(e) => setProductData({...productData, price: parseFloat(e.target.value)})}
                    placeholder="Enter price"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input 
                    id="stock" 
                    type="number"
                    value={productData.stock}
                    onChange={(e) => setProductData({...productData, stock: parseInt(e.target.value)})}
                    placeholder="Enter stock quantity"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="isAvailable"
                    checked={productData.isAvailable}
                    onCheckedChange={(checked) => setProductData({...productData, isAvailable: checked})}
                  />
                  <Label htmlFor="isAvailable">Product Available</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rentType">Rent Type</Label>
                  <Select 
                    value={productData.rentType}
                    onValueChange={(value) => setProductData({...productData, rentType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rent type" />
                    </SelectTrigger>
                    <SelectContent>
                      {rentTypeOptions.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Additional product attributes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <MultiSelectField
                  label="Events"
                  options={eventOptions}
                  selectedValues={selectedEvents}
                  onToggle={(value) => handleMultiSelectToggle(value, selectedEvents, setSelectedEvents)}
                />

                <div className="space-y-2">
                  <Label>Relation</Label>
                  <Select 
                    value={selectedRelation}
                    onValueChange={setSelectedRelation}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relation" />
                    </SelectTrigger>
                    <SelectContent>
                      {relationOptions.map((relation) => (
                        <SelectItem key={relation} value={relation}>
                          {relation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Material</Label>
                  <Select 
                    value={selectedMaterial}
                    onValueChange={setSelectedMaterial}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      {materialOptions.map((material) => (
                        <SelectItem key={material} value={material}>
                          {material}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Size</Label>
                  <Select 
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizeOptions.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input 
                    id="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    placeholder="Enter color"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select 
                    value={selectedType}
                    onValueChange={setSelectedType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media">
            {renderMediaTab()}
          </TabsContent>
        </Tabs>

        {/* Sticky Action Buttons */}
        <div className="sticky bottom-0 bg-background border-t p-4 mt-8">
          <div className="flex flex-wrap gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowPreview(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSubmit}>
              <Save className="w-4 h-4 mr-2" />
              Save Product
            </Button>
          </div>
        </div>

        {showPreview && (
          <ProductPreviewModalComponent
            product={productData}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>
    </>
  )
}

