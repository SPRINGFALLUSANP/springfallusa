import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Trash2, Bell, MessageSquare, Star, Image as ImageIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface Experience {
  id: string;
  name: string;
  university: string;
  experience: string;
  created_at: string;
}

interface Testimonial {
  id: string;
  name: string;
  content: string;
  created_at: string;
  quote?: string;
  email: string | null;
  photo_url: string | null;
  role: string | null;
}

interface Notice {
  title: string;
  content: string;
  image_url?: string;
  is_emergency: boolean;
  is_active: boolean;
}

export default function AdminDashboardPage(): JSX.Element {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [notice, setNotice] = useState<Notice>({
    title: '',
    content: '',
    is_emergency: false,
    is_active: true,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ type: string; id: string } | null>(null);

  // Check admin authentication
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-login');
    }
  }, [navigate]);

  // Fetch data
  useEffect(() => {
    fetchExperiences();
    fetchTestimonials();
  }, []);

  const fetchExperiences = async () => {
    // Replace with static data for frontend-only version
    setExperiences([]);
  };

  const fetchTestimonials = async () => {
    // Replace with static data for frontend-only version
    setTestimonials([]);
  };

  const handleDeleteExperience = async (id: string) => {
    setIsLoading(true);
    // Replace with static logic for frontend-only version
    setExperiences(experiences.filter(exp => exp.id !== id));
    setIsLoading(false);
    setDeleteConfirmation(null);
    toast({
      title: "Success",
      description: "Experience deleted successfully",
    });
  };

  const handleDeleteTestimonial = async (id: string) => {
    setIsLoading(true);
    // Replace with static logic for frontend-only version
    setTestimonials(testimonials.filter(test => test.id !== id));
    setIsLoading(false);
    setDeleteConfirmation(null);
    toast({
      title: "Success",
      description: "Testimonial deleted successfully",
    });
  };

  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Replace with static logic for frontend-only version
    toast({
      title: "Success",
      description: "Notice created successfully (frontend only)",
    });
    setNotice({
      title: '',
      content: '',
      is_emergency: false,
      is_active: true,
    });
    setSelectedImage(null);
    setIsLoading(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    sessionStorage.removeItem('adminEmail');
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-visa-navy">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your website content</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="notices" className="space-y-6">
          <TabsList className="bg-white p-1 rounded-lg border">
            <TabsTrigger value="notices" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Emergency Notices
            </TabsTrigger>
            <TabsTrigger value="experiences" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Visa Experiences
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Testimonials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notices">
            <Card>
              <CardHeader>
                <CardTitle>Create Emergency Notice</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateNotice} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={notice.title}
                      onChange={(e) => setNotice({ ...notice, title: e.target.value })}
                      placeholder="Notice title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={notice.content}
                      onChange={(e) => setNotice({ ...notice, content: e.target.value })}
                      placeholder="Write your notice content here..."
                      className="min-h-[200px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Image (Optional)</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="flex-1"
                      />
                      {selectedImage && (
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={notice.is_emergency}
                        onChange={(e) => setNotice({ ...notice, is_emergency: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                      Emergency Notice
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={notice.is_active}
                        onChange={(e) => setNotice({ ...notice, is_active: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                      Active
                    </label>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Notice...
                      </>
                    ) : (
                      'Create Notice'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experiences">
            <div className="grid gap-4">
              {experiences.map((exp) => (
                <Card key={exp.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{exp.name}</h3>
                        <p className="text-sm text-gray-600">{exp.university}</p>
                        <p className="text-gray-600">{exp.experience}</p>
                        <p className="text-xs text-gray-400">
                          Posted on {format(new Date(exp.created_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => setDeleteConfirmation({ type: 'experience', id: exp.id })}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                          </DialogHeader>
                          <p>Are you sure you want to delete this experience? This action cannot be undone.</p>
                          <div className="flex justify-end gap-4">
                            <Button variant="outline" onClick={() => setDeleteConfirmation(null)}>
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeleteExperience(exp.id)}
                              disabled={isLoading}
                            >
                              {isLoading ? 'Deleting...' : 'Delete'}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="testimonials">
            <div className="grid gap-4">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.content}</p>
                        <p className="text-xs text-gray-400">
                          Posted on {format(new Date(testimonial.created_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => setDeleteConfirmation({ type: 'testimonial', id: testimonial.id })}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                          </DialogHeader>
                          <p>Are you sure you want to delete this testimonial? This action cannot be undone.</p>
                          <div className="flex justify-end gap-4">
                            <Button variant="outline" onClick={() => setDeleteConfirmation(null)}>
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeleteTestimonial(testimonial.id)}
                              disabled={isLoading}
                            >
                              {isLoading ? 'Deleting...' : 'Delete'}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
