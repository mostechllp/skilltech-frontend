const IS_PRODUCTION = typeof window !== 'undefined' 
  ? !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')
  : process.env.NODE_ENV === 'production';

export const API_BASE_URL = IS_PRODUCTION 
  ? "https://app.skilltechonline.com/api" 
  : "http://127.0.0.1:8000/api";

export const MEDIA_BASE_URL = IS_PRODUCTION 
  ? "https://app.skilltechonline.com" 
  : "http://127.0.0.1:8000/";

export async function fetchMainCategories() {
  const res = await fetch(`${API_BASE_URL}/maincategories/`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch main categories");
  return res.json();
}

export async function fetchCategories(showInHome?: boolean, showInExploreHome?: boolean, showInFooter?: boolean) {
  let url = `${API_BASE_URL}/categories/`;
  const params = new URLSearchParams();
  
  if (showInHome !== undefined) {
    params.append('show_in_home', showInHome.toString());
  }
  if (showInExploreHome !== undefined) {
    params.append('show_in_explore_home', showInExploreHome.toString());
  }
  if (showInFooter !== undefined) {
    params.append('show_in_footer', showInFooter.toString());
  }
  
  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  console.log(url,'checkingurl')

  // Cache for 1 hour (3600 seconds)
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function fetchCategoryBySlug(slug: string) {
  const res = await fetch(`${API_BASE_URL}/categories/${slug}/`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchSubCategoriesByCategory(categorySlug: string) {
    const res = await fetch(`${API_BASE_URL}/subcategories/?category_slug=${categorySlug}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch subcategories");
    return res.json();
}

export async function fetchSubCategoryBySlug(slug: string) {
    const res = await fetch(`${API_BASE_URL}/subcategories/${slug}/`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
}


export async function fetchProducts(showInHome?: boolean, page: number = 1, category_slug?: string) {
  const params = new URLSearchParams();
  if (showInHome !== undefined) {
    params.append('show_in_home', showInHome.toString());
  }
  if (!showInHome) {
    params.append('page', page.toString());
  }
  if (category_slug) {
    params.append('category_slug', category_slug);
  }
  
  const url = `${API_BASE_URL}/products/?${params.toString()}`;
  const res = await fetch(url, { next: { revalidate: 60 } }); 
  if (!res.ok) {
    console.error(`Failed to fetch products at ${url}: ${res.status} ${res.statusText}`);
    try {
        const text = await res.text();
        console.error("Response body:", text);
    } catch (e) {
        console.error("Could not read response body");
    }
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  
  if (showInHome) {
      return data.results || data;
  }
  return data;
}

export async function fetchProductsBySubCategory(subcategorySlug: string, page: number = 1, arm?: string) {
  let url = `${API_BASE_URL}/products/?subcategory_slug=${subcategorySlug}&page=${page}`;
  if (arm) {
    url += `&arm=${arm}`;
  }
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Failed to fetch products for subcategory ${subcategorySlug} at ${url}: ${res.status} ${res.statusText}`);
    try {
        const text = await res.text();
        console.error("Response body:", text);
    } catch (e) {
        console.error("Could not read response body");
    }
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export async function searchProducts(query: string, page: number = 1) {
  const res = await fetch(`${API_BASE_URL}/products/?search=${encodeURIComponent(query)}&page=${page}`, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("Failed to search products");
  return res.json();
}

export async function searchProductsPopup(query: string) {
  const res = await fetch(`${API_BASE_URL}/products/?search=${encodeURIComponent(query)}&limit=4`, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("Failed to search products");
  const data = await res.json();
  return data.results || data;
}

export async function submitEnquiry(slug: string, data: any) {
    const res = await fetch(`${API_BASE_URL}/products/${slug}/enquire/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to submit enquiry");
    }
    return res.json();
}

export async function submitContactForm(data: any) {
    const res = await fetch(`${API_BASE_URL}/contact/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to submit contact form");
    }
    return res.json();
}

export async function submitServiceBooking(data: any) {
    const res = await fetch(`${API_BASE_URL}/service-booking/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to submit service booking");
    }
    return res.json();
}

export async function fetchProductBySlug(slug: string) {
  const res = await fetch(`${API_BASE_URL}/products/${slug}/`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchBanners() {
  const res = await fetch(`${API_BASE_URL}/homepage-banners/`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch banners");
  return res.json();
}

export async function fetchOffers() {
  const res = await fetch(`${API_BASE_URL}/offers/`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch offers");
  return res.json();
}

export async function fetchClients() {
  const res = await fetch(`${API_BASE_URL}/clients/`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch clients");
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch(`${API_BASE_URL}/projects/`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function fetchSEO(page: string) {
  const res = await fetch(`${API_BASE_URL}/seo/${page}/`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchCatalogues() {
  const res = await fetch(`${API_BASE_URL}/catalogues/`);
  if (!res.ok) throw new Error("Failed to fetch catalogues");
  return res.json();
}

export async function fetchCertificates() {
  const res = await fetch(`${API_BASE_URL}/certificates/`);
  if (!res.ok) throw new Error("Failed to fetch certificates");
  return res.json();
}

export async function fetchGallery(categorySlug?: string) {
  const url = categorySlug 
    ? `${API_BASE_URL}/gallery/?category_slug=${categorySlug}`
    : `${API_BASE_URL}/gallery/`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch gallery images");
  return res.json();
}

export async function fetchPageBanner(pageName: string) {
  const res = await fetch(`${API_BASE_URL}/page-banners/${pageName}/`);
  // If 404, it might just mean no banner is set up for this page yet.
  if (!res.ok) return null;
  return res.json();
}

export async function fetchBlogPosts() {
  const res = await fetch(`${API_BASE_URL}/blogs/`);
  if (!res.ok) throw new Error("Failed to fetch blog posts");
  return res.json();
}

export async function fetchBlogBySlug(slug: string) {
  const res = await fetch(`${API_BASE_URL}/blogs/${slug}/`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}


export async function fetchSiteSettings() {
  const res = await fetch(`${API_BASE_URL}/settings/`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchServices() {
  const res = await fetch(`${API_BASE_URL}/services/`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
}

export async function fetchServiceFaqs(serviceId?: number) {
    const url = `${API_BASE_URL}/service-faqs/`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch service FAQs");
    return res.json();
}

export async function submitCareerApplication(data: FormData) {
    const res = await fetch(`${API_BASE_URL}/career-applications/`, {
        method: 'POST',
        body: data, 
        // Do not set Content-Type header when sending FormData, let browser set it with boundary
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(JSON.stringify(errorData) || "Failed to submit application");
    }
    return res.json();
}

export async function submitQuoteRequest(data: FormData) {
    const res = await fetch(`${API_BASE_URL}/quote-request/`, {
        method: 'POST',
        body: data,
        // Do not set Content-Type header when sending FormData, let browser set it with boundary
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message = errorData.detail || errorData.message || (typeof errorData === 'object' ? Object.values(errorData).flat().join(', ') : '') || "Failed to submit quote request";
        throw new Error(message);
    }
    return res.json();
}

export async function fetchCareerPositions() {
  const res = await fetch(`${API_BASE_URL}/career-positions/`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch career positions");
  return res.json();
}

export async function fetchGlobalLocations() {
  const res = await fetch(`${API_BASE_URL}/global-locations/`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch global locations");
  return res.json();
}

export async function fetchStatistics() {
  const res = await fetch(`${API_BASE_URL}/statistics/`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch statistics");
  return res.json();
}

export async function fetchServiceStatistics() {
  const res = await fetch(`${API_BASE_URL}/service-statistics/`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch service statistics");
  return res.json();
}

export async function fetchSitemapData() {
  const res = await fetch(`${API_BASE_URL}/sitemap-data/`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch sitemap data");
  return res.json();
}

export async function fetchNewsPost(page: number = 1){
  const res = await fetch(`${API_BASE_URL}/newspost/?page=${page}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch newspost data");
  return res.json();
}

export async function fetchArms(){
  const res=await fetch(`${API_BASE_URL}/arms/`)
  if(!res.ok) throw new Error("Failed to fetch arms data")
    return res.json()
}

export async function fetchBranchLocations() {
  const res = await fetch(`${API_BASE_URL}/branch-locations/`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch branch locations");
  return res.json();
}