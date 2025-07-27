# Componentes Reutilizables

Esta carpeta contiene componentes reutilizables que pueden ser utilizados en múltiples páginas del proyecto.

## Componentes Disponibles

### Layout Components

#### `Navbar`
Barra de navegación principal.
```jsx
import { Navbar } from '../components';
<Navbar />
```

#### `Footer`
Pie de página principal.
```jsx
import { Footer } from '../components';
<Footer />
```

### Reusable Components

#### `SectionNavigation`
Navegación de secciones que aparece en todas las páginas.
```jsx
import { SectionNavigation } from '../components';
<SectionNavigation />
```

#### `PageBanner`
Banner de página con título y subtítulo opcional.
```jsx
import { PageBanner } from '../components';
<PageBanner 
  title="Sneaky Sneakers" 
  subtitle="Tu tienda de zapatillas"
  bgColor="bg-black"
  textColor="text-white"
/>
```

#### `ProductCard`
Tarjeta para mostrar productos/zapatillas.
```jsx
import { ProductCard } from '../components';
<ProductCard
  id={1}
  name="Nike Air Max"
  price="$120"
  image="/path/to/image.jpg"
  onAddToCart={(product) => console.log(product)}
  showAddToCart={true}
/>
```

#### `PlayerCard`
Tarjeta para mostrar información de jugadores.
```jsx
import { PlayerCard } from '../components';
<PlayerCard
  name="LeBron James"
  path="/lebron-james"
  image="/path/to/image.jpg"
  showInfoButton={true}
/>
```

#### `NewsletterSection`
Sección de suscripción al newsletter.
```jsx
import { NewsletterSection } from '../components';
<NewsletterSection
  title="SUSCRIBITE AL NEWSLETTER"
  placeholder="Ingrese su E-mail"
  buttonText="Suscribirse"
  onSubmit={(email) => console.log(email)}
/>
```

#### `FooterLinks`
Enlaces del pie de página.
```jsx
import { FooterLinks } from '../components';
<FooterLinks />
```

#### `ImageCarousel`
Carousel de imágenes con controles.
```jsx
import { ImageCarousel } from '../components';
<ImageCarousel
  images={['/img1.jpg', '/img2.jpg', '/img3.jpg']}
  title="Featured Sneakers"
  autoPlay={true}
  interval={4000}
  showDots={true}
  showArrows={true}
/>
```

#### `BrandCard`
Tarjeta para mostrar marcas.
```jsx
import { BrandCard } from '../components';
<BrandCard
  name="Nike"
  image="/path/to/logo.jpg"
  link="/nike-products"
/>
```

#### `FormInput`
Input de formulario reutilizable con validación.
```jsx
import { FormInput } from '../components';
<FormInput
  type="email"
  name="email"
  placeholder="Ingrese su email"
  value={email}
  onChange={handleChange}
  required={true}
  label="Email"
  error="Email inválido"
/>
```

#### `ImageGrid`
Grid de imágenes para mostrar productos/zapatillas.
```jsx
import { ImageGrid } from '../components';
<ImageGrid
  images={['Nike SB/102.webp', 'Jordan/15.webp', 'NIKE/10.webp']}
  title="Kids Collection"
  basePath="/src/assets/img/"
/>
```

#### `Accordion`
Componente acordeón para FAQ y políticas.
```jsx
import { Accordion } from '../components';
<Accordion
  items={[
    { title: "Pregunta 1", content: "Respuesta 1" },
    { title: "Pregunta 2", content: "Respuesta 2" }
  ]}
  title="PREGUNTAS FRECUENTES"
/>
```

#### `ContentSection`
Sección de contenido simple con título.
```jsx
import { ContentSection } from '../components';
<ContentSection
  title="About Us"
  content={<p>Contenido de la página...</p>}
/>
```

#### `PlayerPage`
Página completa para jugadores con banner, perfil, logros y zapatillas.
```jsx
import { PlayerPage } from '../components';
<PlayerPage
  playerName="LeBron James"
  bannerGradient="bg-gradient-to-r from-purple-600 to-yellow-500"
  profileImage="/src/assets/img/LeBron/lebron_james.webp"
  achievements={achievements}
  shoes={shoes}
/>
```

## Uso General

Para importar múltiples componentes:

```jsx
import { 
  SectionNavigation, 
  PageBanner, 
  ProductCard,
  ImageGrid,
  Accordion,
  ContentSection,
  PlayerPage,
  Navbar,
  Footer 
} from '../components';
```

## Beneficios

1. **Reutilización**: Los mismos componentes se usan en múltiples páginas
2. **Consistencia**: Mantiene un diseño uniforme en toda la aplicación
3. **Mantenimiento**: Cambios en un componente se reflejan en todas las páginas
4. **Legibilidad**: Código más limpio y fácil de entender
5. **Escalabilidad**: Fácil agregar nuevas funcionalidades

## Ejemplo de Refactorización

### Antes:
```jsx
// Código repetitivo en cada página
<section className="bg-gray-100 py-2">
  <div className="container mx-auto">
    <nav className="flex justify-center space-x-8">
      <Link to="/men">Hombre</Link>
      <Link to="/women">Mujer</Link>
      {/* ... más enlaces */}
    </nav>
  </div>
</section>

<section className="banner bg-black text-white py-8 text-center">
  <h1 className="text-4xl font-bold">Sneaky Sneakers</h1>
</section>

<section className="py-8">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8">PREGUNTAS FRECUENTES</h2>
    <div className="max-w-4xl mx-auto">
      {faqData.map((item, index) => (
        <div key={index} className="mb-4 border border-gray-200 rounded-lg">
          <button className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
            {/* ... contenido del acordeón */}
          </button>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Después:
```jsx
// Componentes reutilizables
<SectionNavigation />
<PageBanner title="Sneaky Sneakers" />
<Accordion items={faqData} title="PREGUNTAS FRECUENTES" />
```

## Páginas Refactorizadas

Las siguientes páginas han sido refactorizadas para usar componentes reutilizables:

**Páginas de Productos:**
- ✅ `Home.jsx`
- ✅ `Men.jsx` 
- ✅ `Women.jsx`
- ✅ `Kids.jsx`
- ✅ `NewArrivals.jsx`
- ✅ `Sale.jsx`
- ✅ `AllProducts.jsx`

**Páginas de Información:**
- ✅ `AboutUs.jsx`
- ✅ `FAQ.jsx`
- ✅ `ExchangePolicy.jsx`
- ✅ `PaymentMethods.jsx`
- ✅ `ShippingPolicy.jsx`

**Páginas de Jugadores:**
- ✅ `GiannisAntetokounmpo.jsx`
- ✅ `JamesHarden.jsx`
- ✅ `KevinDurant.jsx`
- ✅ `LeBronJames.jsx`
- ✅ `PaulGeorge.jsx`

**Páginas de Autenticación:**
- ✅ `LoginPage.jsx` 