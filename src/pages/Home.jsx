import React, { useEffect, useState, useCallback, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "all";
  const selectedSort = searchParams.get("sort") || "price-asc";

  const fetchData = useCallback(async () => {
    try {
      setLoading(true); 
      const productRes = await fetch("https://fakestoreapi.com/products");
      const productData = await productRes.json();
      setProducts(productData);

      const categoryRes = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const categoryData = await categoryRes.json();
      setCategories(["all", ...categoryData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCategoryChange = (category) => {
    setSearchParams({ category, sort: selectedSort });
  };

  const handleSortChange = (sort) => {
    setSearchParams({ category: selectedCategory, sort });
  };

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((product) =>
        selectedCategory === "all"
          ? true
          : product.category === selectedCategory
      )
      .sort((a, b) => {
        switch (selectedSort) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "title-asc":
            return a.title.localeCompare(b.title);
          case "title-desc":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
  }, [products, selectedCategory, selectedSort]);

  return (
    <div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="filter-sort">
            <select
              onChange={(e) => handleCategoryChange(e.target.value)}
              value={selectedCategory}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => handleSortChange(e.target.value)}
              value={selectedSort}
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-asc">Title: A to Z</option>
              <option value="title-desc">Title: Z to A</option>
            </select>
          </div>

          <div className="product-grid">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
