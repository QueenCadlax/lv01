# 🔧 TECHNICAL RECOMMENDATIONS - SPECIFIC CODE EXAMPLES & FIXES

**For Each Issue Found:** Include exact code patterns to fix

---

## ISSUE #1: App.tsx Monolith (5088 Lines)

### Current Problem
```typescript
// App.tsx contains:
// - 150+ useState hooks
// - 50+ component imports
// - 50+ switch cases for routing
// - All business logic mixed together
// - ~5088 lines total
```

### Recommended Fix: Extract State Management

**Create:** `hooks/useAppState.ts`
```typescript
interface AppState {
  currentView: string;
  selectedBusinessId: string;
  activeCategory: string;
  activeSub: string;
  activeArea: string;
  isMenuOpen: boolean;
  isAuthenticated: boolean;
  currentUser: any;
  // ... etc
}

export const useAppState = () => {
  const [state, setState] = useState<AppState>({
    currentView: 'home',
    selectedBusinessId: '',
    activeCategory: '',
    activeSub: '',
    activeArea: 'All Areas',
    isMenuOpen: false,
    isAuthenticated: false,
    currentUser: null
  });

  const setCurrentView = useCallback((view: string) => {
    setState(prev => ({ ...prev, currentView: view }));
  }, []);

  const setSelectedBusinessId = useCallback((id: string) => {
    setState(prev => ({ ...prev, selectedBusinessId: id }));
  }, []);

  // ... more setters

  return { state, setCurrentView, setSelectedBusinessId, /* ... */ };
};

// Usage in App.tsx:
const { state, setCurrentView } = useAppState();
```

**Benefit:** Reduces App.tsx by ~200 lines, easier to test

---

## ISSUE #2: Navigation Without URL State

### Current Problem
```typescript
// No browser history → no deep links
// Refresh page → go back to home
// Share URL → doesn't work
```

### Recommended Fix: Add URL Sync

**Create:** `hooks/useUrlSync.ts`
```typescript
export const useUrlSync = (
  currentView: string,
  activeCategory: string,
  selectedBusinessId: string
) => {
  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentView !== 'home') params.set('view', currentView);
    if (activeCategory) params.set('category', activeCategory);
    if (selectedBusinessId) params.set('id', selectedBusinessId);

    const url = params.toString() ? `?${params.toString()}` : '/';
    window.history.pushState({}, '', url);
  }, [currentView, activeCategory, selectedBusinessId]);

  // Load initial state from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      view: params.get('view') || 'home',
      category: params.get('category') || '',
      id: params.get('id') || ''
    };
  }, []);

  // Listen to back button
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      // Restore state from URL
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
};
```

**Usage in App.tsx:**
```typescript
useUrlSync(currentView, activeCategory, selectedBusinessId);
```

**Benefit:** Users can share links, browser back/forward works

---

## ISSUE #3: Filter Logic Duplication

### Current Problem
```typescript
// EatsPage.tsx has filter logic
// RetailPage.tsx has almost identical logic
// BusinessPage.tsx has almost identical logic
// Each has own implementation → hard to maintain
```

### Recommended Fix: Create Generic Filter Component

**Create:** `components/FilterPanel.tsx`
```typescript
interface FilterConfig {
  label: string;
  key: string;
  type: 'multi-select' | 'price-range' | 'search' | 'checkbox';
  options?: string[];
  min?: number;
  max?: number;
}

interface FilterPanelProps {
  filters: FilterConfig[];
  onFilter: (state: FilterState) => void;
  onReset: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilter,
  onReset
}) => {
  const [state, setState] = useState<FilterState>({});

  const handleChange = (key: string, value: any) => {
    const newState = { ...state, [key]: value };
    setState(newState);
    onFilter(newState);
  };

  return (
    <div className="space-y-4">
      {filters.map(filter => {
        if (filter.type === 'multi-select') {
          return (
            <MultiSelectFilter
              key={filter.key}
              label={filter.label}
              options={filter.options || []}
              onChange={(value) => handleChange(filter.key, value)}
            />
          );
        }
        if (filter.type === 'price-range') {
          return (
            <PriceRangeFilter
              key={filter.key}
              min={filter.min || 0}
              max={filter.max || 10000}
              onChange={(value) => handleChange(filter.key, value)}
            />
          );
        }
        // ... other types
        return null;
      })}
      <button onClick={onReset} className="w-full">
        Reset Filters
      </button>
    </div>
  );
};
```

**Usage:**
```typescript
// EatsPage.tsx
<FilterPanel
  filters={[
    { label: 'Areas', key: 'areas', type: 'multi-select', options: MPUMALANGA_AREAS },
    { label: 'Cuisines', key: 'cuisines', type: 'multi-select', options: CUISINES },
    { label: 'Price', key: 'price', type: 'price-range', min: 0, max: 5000 }
  ]}
  onFilter={handleFilter}
  onReset={handleReset}
/>
```

**Benefit:** One implementation, reused everywhere, 50% less code

---

## ISSUE #4: Detail View Code Duplication

### Current Problem
```typescript
// Each detail view has:
// - Gallery carousel (same logic)
// - Tabs (same logic)
// - Contact form (same logic)
// - Wishlist button (same logic)
```

### Recommended Fix: Create Base Detail Component

**Create:** `components/BaseDetailView.tsx`
```typescript
interface DetailSection {
  id: string;
  label: string;
  render: () => React.ReactNode;
}

interface BaseDetailViewProps {
  item: Business;
  sections: DetailSection[];
  onClose: () => void;
  onFavoriteToggle: (id: string) => void;
  isFavorite: boolean;
  images?: string[];
}

export const BaseDetailView: React.FC<BaseDetailViewProps> = ({
  item,
  sections,
  onClose,
  onFavoriteToggle,
  isFavorite,
  images = [item.image]
}) => {
  const [activeTab, setActiveTab] = useState(sections[0].id);
  const { currentIndex, prev, next } = useImageGallery(images);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [item.id]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Gallery */}
      <div className="relative h-96 bg-gray-900">
        <img src={images[currentIndex]} className="w-full h-full object-cover" />
        <button onClick={prev} className="absolute left-4 top-1/2">←</button>
        <button onClick={next} className="absolute right-4 top-1/2">→</button>
        <button onClick={() => onFavoriteToggle(item.id)} className="absolute top-4 right-4">
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={activeTab === section.id ? 'border-b-2 border-gold' : ''}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {sections.find(s => s.id === activeTab)?.render()}
      </div>

      {/* Back button */}
      <button onClick={onClose} className="fixed top-4 left-4">
        ← Back
      </button>
    </div>
  );
};
```

**Usage in EateryDetail:**
```typescript
// BEFORE: 800 lines of duplicate code
// AFTER: 100 lines

const EateryDetail = ({ eateryId, navigate, favorites, toggleFavorite }) => {
  return (
    <BaseDetailView
      item={eatery}
      sections={[
        {
          id: 'overview',
          label: 'Overview',
          render: () => (
            <div>
              <h2>{eatery.name}</h2>
              <p>{eatery.description}</p>
              {/* Eatery-specific content */}
            </div>
          )
        },
        {
          id: 'menu',
          label: 'Menu',
          render: () => <MenuSection menu={eatery.menu} />
        },
        {
          id: 'reviews',
          label: 'Reviews',
          render: () => <ReviewsSection reviews={eatery.reviews} />
        }
      ]}
      onClose={() => navigate('eats')}
      onFavoriteToggle={toggleFavorite}
      isFavorite={favorites.has(eateryId)}
      images={eatery.images || [eatery.image]}
    />
  );
};
```

**Benefit:** Reduces code by 70%, consistent UX across all detail views

---

## ISSUE #5: API Response Inconsistency

### Current Problem
```typescript
// Different endpoints return different formats:

GET /api/businesses
// Returns: { success: true, data: [...] }

GET /api/auth/login
// Returns: { token: "..." }

POST /api/enquiries
// Returns: { message: "Created", id: 123 }
```

### Recommended Fix: Create Response Wrapper

**Create:** `backend/src/utils/apiResponse.ts`
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
  timestamp: string;
  requestId: string;
}

export const successResponse = <T>(
  data: T,
  message?: string,
  status = 200
): ApiResponse<T> => ({
  success: true,
  data,
  status,
  timestamp: new Date().toISOString(),
  requestId: generateRequestId()
});

export const errorResponse = (
  error: string,
  status = 400
): ApiResponse<null> => ({
  success: false,
  error,
  status,
  timestamp: new Date().toISOString(),
  requestId: generateRequestId()
});

export const paginatedResponse = <T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): ApiResponse<T[]> & { pagination: any } => ({
  ...successResponse(data),
  pagination: {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit)
  }
});
```

**Usage in endpoints:**
```typescript
// BEFORE
router.get('/businesses', (req, res) => {
  try {
    const businesses = await pool.query('SELECT * FROM businesses');
    res.json({ success: true, data: businesses.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// AFTER
router.get('/businesses', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      'SELECT * FROM businesses LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    const countResult = await pool.query('SELECT COUNT(*) FROM businesses');
    const total = parseInt(countResult.rows[0].count);

    res.json(paginatedResponse(result.rows, page, limit, total));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to fetch businesses', 500));
  }
});
```

**Benefit:** Consistent API responses everywhere, easier frontend handling

---

## ISSUE #6: File Upload Not Implemented

### Current Problem
```typescript
// BusinessSubmissionForm.tsx
const [logoFile, setLogoFile] = useState<File | null>(null);

// When submitting, file object sent directly
// Backend doesn't handle multipart/form-data
// File gets lost
```

### Recommended Fix: Implement Proper File Upload

**Frontend:** `hooks/useFileUpload.ts`
```typescript
interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export const useFileUpload = () => {
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);

      const xhr = new XMLHttpRequest();

      // Track progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentage = Math.round((e.loaded / e.total) * 100);
          setProgress({
            loaded: e.loaded,
            total: e.total,
            percentage
          });
        }
      });

      // Handle completion
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.fileUrl);
        } else {
          reject(new Error('Upload failed'));
        }
      });

      xhr.addEventListener('error', () => {
        setError('Upload failed');
        reject(new Error('Upload failed'));
      });

      xhr.open('POST', '/api/upload');
      xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`);
      xhr.send(formData);
    });
  }, []);

  return { uploadFile, progress, error };
};
```

**Usage in form:**
```typescript
const { uploadFile, progress } = useFileUpload();

const handleSubmit = async (e) => {
  e.preventDefault();

  let logoUrl = null;
  if (logoFile) {
    try {
      logoUrl = await uploadFile(logoFile);
    } catch (error) {
      setError('Failed to upload logo');
      return;
    }
  }

  // Now submit form with logoUrl (string), not file
  const response = await fetch('/api/businesses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: businessName,
      logo: logoUrl,
      // ...
    })
  });
};

// Show upload progress
{progress && (
  <div>
    <progress value={progress.percentage} max="100" />
    <p>{progress.percentage}% uploaded</p>
  </div>
)}
```

**Backend:** `backend/src/routes/uploadRoutes.ts`
```typescript
import multer from 'multer';
import cloudinary from 'cloudinary';

const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images allowed'));
    }
    cb(null, true);
  }
});

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(errorResponse('No file provided'));
    }

    // Upload to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    res.json(successResponse({
      fileUrl: result.secure_url,
      filename: result.public_id
    }));
  } catch (error) {
    res.status(500).json(errorResponse('Upload failed'));
  }
});
```

**Benefit:** Users can upload profile pictures, business logos, product images

---

## ISSUE #7: No Form Validation

### Current Problem
```typescript
// Forms submit with empty fields
// No real-time validation feedback
// Submit button doesn't disable when form invalid
```

### Recommended Fix: Create Form Validation Hook

**Create:** `hooks/useFormValidation.ts`
```typescript
interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: any) => string | null;
}

interface FormErrors {
  [key: string]: string;
}

export const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  onSubmit: (values: T) => Promise<void>,
  validate: Record<keyof T, ValidationRule>
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: string, value: any) => {
    const rules = validate[name as keyof T];
    if (!rules) return null;

    if (rules.required && !value) {
      return `${name} is required`;
    }
    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum ${rules.minLength} characters`;
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maximum ${rules.maxLength} characters`;
    }
    if (rules.pattern && !rules.pattern.test(value)) {
      return `Invalid ${name}`;
    }
    if (rules.validate) {
      return rules.validate(value);
    }
    return null;
  }, [validate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));

    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error || ''
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error || ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(values).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    // If no errors, submit
    if (Object.values(newErrors).every(e => !e)) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const isValid = Object.values(errors).every(e => !e);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit
  };
};
```

**Usage in form:**
```typescript
const { values, errors, touched, isValid, handleChange, handleBlur, handleSubmit } = 
  useFormValidation(
    { email: '', password: '', name: '' },
    async (values) => {
      // Submit
    },
    {
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      password: {
        required: true,
        minLength: 8
      },
      name: {
        required: true,
        minLength: 2
      }
    }
  );

return (
  <form onSubmit={handleSubmit}>
    <input
      name="email"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
      className={errors.email && touched.email ? 'border-red-500' : ''}
    />
    {errors.email && touched.email && (
      <span className="text-red-500">{errors.email}</span>
    )}

    <button type="submit" disabled={!isValid || isSubmitting}>
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  </form>
);
```

**Benefit:** Better UX, fewer invalid submissions, cleaner code

---

## ISSUE #8: N+1 Database Queries

### Current Problem
```typescript
// Gets all businesses, then fetches reviews for each
const businesses = await pool.query('SELECT * FROM businesses');
for (const biz of businesses.rows) {
  const reviews = await pool.query(
    'SELECT * FROM reviews WHERE business_id = $1',
    [biz.id]
  );
  // N+1 problem: 1 + N queries
}
```

### Recommended Fix: Use JOIN or DataLoader

**Better Approach 1: SQL JOIN**
```typescript
const result = await pool.query(`
  SELECT 
    b.*,
    COUNT(r.id) as review_count,
    AVG(r.rating) as avg_rating
  FROM businesses b
  LEFT JOIN reviews r ON b.id = r.business_id
  GROUP BY b.id
  LIMIT $1 OFFSET $2
`, [limit, offset]);
```

**Better Approach 2: DataLoader (for GraphQL-like behavior)**
```typescript
import DataLoader from 'dataloader';

const reviewLoader = new DataLoader(async (businessIds) => {
  const result = await pool.query(
    'SELECT * FROM reviews WHERE business_id = ANY($1)',
    [businessIds]
  );

  const reviewsByBusiness = {};
  result.rows.forEach(review => {
    if (!reviewsByBusiness[review.business_id]) {
      reviewsByBusiness[review.business_id] = [];
    }
    reviewsByBusiness[review.business_id].push(review);
  });

  return businessIds.map(id => reviewsByBusiness[id] || []);
});

// Usage
const businesses = await pool.query('SELECT * FROM businesses');
const businessesWithReviews = await Promise.all(
  businesses.rows.map(async (biz) => ({
    ...biz,
    reviews: await reviewLoader.load(biz.id)
  }))
);
```

**Benefit:** Reduces database queries from 101 to 2 (for 100 businesses)

---

## ISSUE #9: Missing Search Indexing

### Current Problem
```typescript
// Search filters entire array
const filtered = businesses.filter(b =>
  b.name.toLowerCase().includes(query.toLowerCase())
);
// O(n) for every search → slow for large datasets
```

### Recommended Fix: Add Full-Text Search Index

**Database:**
```sql
-- Create full-text search index
CREATE INDEX idx_businesses_search ON businesses 
USING GIN (to_tsvector('english', name || ' ' || description || ' ' || category));

-- Create indexes for common filters
CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_businesses_tier ON businesses(tier);
CREATE INDEX idx_businesses_area ON businesses(location);
```

**Backend Query:**
```typescript
const searchBusinesses = async (query: string, category?: string) => {
  // Use full-text search
  const result = await pool.query(`
    SELECT *, 
      ts_rank(to_tsvector('english', name || ' ' || description), 
              plainto_tsquery('english', $1)) as relevance
    FROM businesses
    WHERE to_tsvector('english', name || ' ' || description) @@ 
          plainto_tsquery('english', $1)
    ${category ? 'AND category = $2' : ''}
    ORDER BY relevance DESC
    LIMIT 20
  `, category ? [query, category] : [query]);

  return result.rows;
};
```

**Benefit:** Search is now O(log n) instead of O(n), much faster

---

## ISSUE #10: JWT in localStorage (Security Risk)

### Current Problem
```typescript
// Stored in localStorage - vulnerable to XSS
localStorage.setItem('auth_token', jwt);

// Any malicious script can steal it:
const stolenToken = localStorage.getItem('auth_token');
```

### Recommended Fix: Use httpOnly Cookies

**Backend:**
```typescript
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify credentials
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (!user.rows.length) {
      return res.status(401).json(errorResponse('Invalid email or password'));
    }

    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!isPasswordValid) {
      return res.status(401).json(errorResponse('Invalid email or password'));
    }

    // Create JWT tokens
    const accessToken = jwt.sign(
      { userId: user.rows[0].id, email: user.rows[0].email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '15m' }  // Short-lived
    );

    const refreshToken = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_REFRESH_SECRET || 'refresh-secret',
      { expiresIn: '30d' }  // Long-lived
    );

    // Set httpOnly cookie (can't be accessed by JavaScript)
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000  // 15 minutes
    });

    // Refresh token cookie (longer expiry)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000  // 30 days
    });

    res.json(successResponse({
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
        name: user.rows[0].name
      }
    }));
  } catch (error) {
    res.status(500).json(errorResponse('Login failed'));
  }
});
```

**Frontend:**
```typescript
// Cookies are automatically sent with requests
// No need to manually add Authorization header

// But if you need to manually make requests:
const response = await fetch('/api/businesses', {
  credentials: 'include'  // Include cookies in request
});
```

**Benefit:** JWT is not accessible to JavaScript, XSS attacks can't steal tokens

---

## ISSUE #11: No Pagination

### Current Problem
```typescript
// Returns ALL 4000 businesses
GET /api/businesses
// Response: 500KB JSON → slow load time
```

### Recommended Fix: Implement Pagination

**Backend:**
```typescript
router.get('/businesses', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, parseInt(req.query.limit as string) || 20);
    const offset = (page - 1) * limit;

    // Get total count
    const countResult = await pool.query('SELECT COUNT(*) as total FROM businesses');
    const total = parseInt(countResult.rows[0].total);

    // Get paginated data
    const result = await pool.query(
      'SELECT * FROM businesses ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json(errorResponse('Failed to fetch businesses'));
  }
});
```

**Frontend:**
```typescript
const useBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBusinesses = useCallback(async (pageNum = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/businesses?page=${pageNum}&limit=20`);
      const result = await response.json();

      setBusinesses(result.data);
      setPage(result.pagination.page);
      setTotal(result.pagination.total);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    businesses,
    page,
    total,
    loading,
    fetchBusinesses,
    hasNext: page < Math.ceil(total / 20)
  };
};
```

**Benefit:** Faster initial load (20 items instead of 4000)

---

## SUMMARY TABLE: Every Fix Estimated Effort

| Issue | Effort | Impact | Priority |
|---|---|---|---|
| URL state sync | 2 hours | High | P1 |
| Break up App.tsx | 8 hours | High | P2 |
| Generic filters | 3 hours | Medium | P2 |
| Base detail view | 4 hours | Medium | P2 |
| API response wrapper | 2 hours | High | P1 |
| File upload | 3 hours | Medium | P1 |
| Form validation hook | 3 hours | Medium | P1 |
| N+1 query fix | 2 hours | Medium | P2 |
| Search indexing | 2 hours | High | P2 |
| JWT cookies | 2 hours | High | P1 |
| Pagination | 3 hours | High | P1 |
| **TOTAL** | **35 hours** | - | - |

---

**All code examples ready to copy-paste and integrate. No implementations done yet - guidance only!**

