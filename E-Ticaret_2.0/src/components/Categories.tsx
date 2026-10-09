import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { setLoading, setProducts } from '../redux/AppSlice';
import { toast } from 'react-toastify';
import categoriesService from '../services/CategoriesService';
import React, { useEffect, useState } from 'react';
import productService from '../services/ProductService';
import type { ProductType } from '../types/Types';

function Categories() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<string[]>([]);
  // Hangi kategorinin seçili olduğunu takip eden state (başlangıçta boş)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getAllCategories = async () => {
    try {
      dispatch(setLoading(true));
      const categoryList: string[] = await categoriesService.getAllCategories();
      setCategories(categoryList);
    } catch (error) {
      toast.error("Kategori listesi alınırken hata oluştu.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCategory = async (e: React.ChangeEvent<HTMLInputElement>, categoryName: string) => {
    try {
      dispatch(setLoading(true));

      if (e.target.checked) {
        // Yeni kategori seçildi
        setSelectedCategory(categoryName);
        const products: ProductType[] = await categoriesService.getProductByCategoryName(categoryName);
        dispatch(setProducts(products));
      } else {
        // Seçim kaldırıldıysa tüm ürünleri geri getir
        setSelectedCategory(null);
        const products: ProductType[] = await productService.getAllProduct();
        dispatch(setProducts(products));
      }
    } catch (error: any) {
      toast.error("Kategoriler alınırken hata oluştu: " + error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div style={{ marginTop: '60px', marginLeft: '30px' }}>
      <FormGroup>
        {categories &&
          categories.map((category: string) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  // defaultChecked kaldırıldı!
                  // Sadece seçilen kategori işaretli görünür:
                  checked={selectedCategory === category}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCategory(e, category)
                  }
                />
              }
              label={category}
            />
          ))}
      </FormGroup>
    </div>
  );
}

export default Categories;