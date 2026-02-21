import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private defaultData: SEOData = {
    title: 'Sabra Shah Quran Academy',
    description: 'Learn Quran with professional instructors at Sabra Shah Quran Academy.',
    keywords: 'quran academy, quran learning, islamic education',
    image: '/assets/og-image.jpg',
    url: 'https://sabra-shah-quran-academy.com',
    type: 'website',
    siteName: 'Sabra Shah Quran Academy'
  };

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  updateSEO(data: Partial<SEOData> = {}): void {
    const seoData = { ...this.defaultData, ...data };

    // Update title
    if (seoData.title) {
      this.title.setTitle(seoData.title);
    }

    // Update or create meta tags
    this.updateMetaTag('description', seoData.description || '');
    this.updateMetaTag('keywords', seoData.keywords || '');

    // Open Graph tags (for Facebook, LinkedIn, etc.)
    this.updateMetaTag('og:title', seoData.title || '', 'property');
    this.updateMetaTag('og:description', seoData.description || '', 'property');
    this.updateMetaTag('og:image', seoData.image || '', 'property');
    this.updateMetaTag('og:url', seoData.url || '', 'property');
    this.updateMetaTag('og:type', seoData.type || 'website', 'property');
    this.updateMetaTag('og:site_name', seoData.siteName || '', 'property');

    // Twitter Card tags
    this.updateMetaTag('twitter:card', 'summary_large_image', 'name');
    this.updateMetaTag('twitter:title', seoData.title || '', 'name');
    this.updateMetaTag('twitter:description', seoData.description || '', 'name');
    this.updateMetaTag('twitter:image', seoData.image || '', 'name');

    // Canonical URL
    this.updateCanonicalUrl(seoData.url || '');
  }

  private updateMetaTag(tag: string, content: string, attribute: 'name' | 'property' = 'name'): void {
    if (content) {
      const selector = attribute === 'name' ? `name="${tag}"` : `property="${tag}"`;
      const existingTag = this.meta.getTag(selector);

      if (existingTag) {
        this.meta.updateTag({ [attribute]: tag, content });
      } else {
        this.meta.addTag({ [attribute]: tag, content });
      }
    }
  }

  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    
    link.setAttribute('href', url);
  }

  addStructuredData(data: object): void {
    // Remove existing structured data script if any
    const existingScript = this.document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  addLocalBusinessStructuredData(businessData: {
    name: string;
    description: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    telephone?: string;
    priceRange?: string;
    image?: string;
    url?: string;
  }): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: businessData.name,
      description: businessData.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: businessData.address.streetAddress,
        addressLocality: businessData.address.addressLocality,
        addressRegion: businessData.address.addressRegion,
        postalCode: businessData.address.postalCode,
        addressCountry: businessData.address.addressCountry
      },
      ...(businessData.telephone && { telephone: businessData.telephone }),
      ...(businessData.priceRange && { priceRange: businessData.priceRange }),
      ...(businessData.image && { image: businessData.image }),
      ...(businessData.url && { url: businessData.url })
    };

    this.addStructuredData(structuredData);
  }

  addServiceStructuredData(serviceData: {
    name: string;
    description: string;
    provider: {
      name: string;
      url?: string;
    };
    areaServed: string;
    offers?: {
      price: string;
      priceCurrency: string;
      availability?: string;
    };
  }): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceData.name,
      description: serviceData.description,
      provider: {
        '@type': 'LocalBusiness',
        name: serviceData.provider.name,
        ...(serviceData.provider.url && { url: serviceData.provider.url })
      },
      areaServed: {
        '@type': 'City',
        name: serviceData.areaServed
      },
      ...(serviceData.offers && {
        offers: {
          '@type': 'Offer',
          price: serviceData.offers.price,
          priceCurrency: serviceData.offers.priceCurrency,
          ...(serviceData.offers.availability && { availability: serviceData.offers.availability })
        }
      })
    };

    this.addStructuredData(structuredData);
  }
}
