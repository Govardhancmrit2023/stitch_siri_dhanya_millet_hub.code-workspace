---
name: Terra-Modern Agriculture
colors:
  surface: '#f8faf3'
  surface-dim: '#d5dcd0'
  surface-bright: '#f8faf3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f5ec'
  surface-container: '#ebefe5'
  surface-container-high: '#e4eadf'
  surface-container-highest: '#dee5d8'
  on-surface: '#2d342c'
  on-surface-variant: '#5a6157'
  inverse-surface: '#0c0f0b'
  inverse-on-surface: '#9b9e97'
  outline: '#767d72'
  outline-variant: '#adb4a8'
  surface-tint: '#41683e'
  primary: '#41683e'
  on-primary: '#eaffe2'
  primary-container: '#c2eeb9'
  on-primary-container: '#345a31'
  inverse-primary: '#cdfac3'
  secondary: '#53644f'
  on-secondary: '#ecfee3'
  secondary-container: '#d5e8ce'
  on-secondary-container: '#465642'
  tertiary: '#60622d'
  on-tertiary: '#fcfdb9'
  tertiary-container: '#fcfeb9'
  on-tertiary-container: '#60622d'
  error: '#a73b21'
  on-error: '#fff7f6'
  error-container: '#fd795a'
  on-error-container: '#6e1400'
  primary-fixed: '#c2eeb9'
  primary-fixed-dim: '#b4e0ab'
  on-primary-fixed: '#224721'
  on-primary-fixed-variant: '#3e653a'
  secondary-fixed: '#d5e8ce'
  secondary-fixed-dim: '#c7dac0'
  on-secondary-fixed: '#344331'
  on-secondary-fixed-variant: '#50604b'
  tertiary-fixed: '#fcfeb9'
  tertiary-fixed-dim: '#eeefac'
  on-tertiary-fixed: '#4e501c'
  on-tertiary-fixed-variant: '#6b6d36'
  primary-dim: '#365c33'
  secondary-dim: '#475743'
  tertiary-dim: '#545622'
  error-dim: '#791903'
  background: '#f8faf3'
  on-background: '#2d342c'
  surface-variant: '#dee5d8'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.1px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.5px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 16px
  column-gutter: 16px
---

## Brand & Style
The design system is rooted in the intersection of traditional agriculture and modern data science. It evokes a sense of reliability, growth, and organic connection. The target audience includes farmers, agricultural traders, and logistics providers who require high legibility in outdoor conditions and a UI that feels as grounded as the work they perform.

The visual style is **Corporate / Modern** with a **Tactile** influence. It leverages Material Design 3 (MD3) principles to ensure systematic consistency while using a coordinated tonal color palette to soften the technical nature of the data. The goal is to create an interface that feels like a natural extension of the farm—clean, efficient, and breathable.

## Colors
The palette is inspired by the harvest cycle and technological precision, utilizing a "Tonal Spot" strategy for a more cohesive and professional aesthetic. The **Sage Harvest** primary color (#598154) represents stable growth and reliable action, offering a more balanced and integrated green than high-saturation variants. The **Muted Olive** secondary color (#6b7c66) provides a natural bridge for secondary navigation and utility elements.

The background system utilizes a neutral, slightly warm-grey to reduce eye strain in variable lighting conditions. **Earthen Gold** (#787a42) serves as a tertiary accent, providing a sophisticated, low-vibrancy pop for specific soil-related data points or specialized alerts. All neutrals are balanced with a slight green-grey cast to ensure they remain harmonious with the botanical theme.

## Typography
This design system utilizes **Inter** for all typographic layers. Inter was chosen for its exceptional legibility and systematic performance across mobile and web platforms. 

Headlines use a tighter letter-spacing and heavier weights to establish clear information hierarchy. Body text is optimized for readability with generous line heights to accommodate users who may be viewing the screen in direct sunlight. Label styles are reserved for navigational elements and small data points, utilizing a medium weight to maintain clarity at smaller scales.

## Layout & Spacing
The layout follows a **Fluid Grid** model based on an 8px rhythmic scale. On mobile devices, a 4-column grid is used with 16px side margins. On larger screens, the system expands to an 8 or 12-column grid while maintaining the 16px gutter.

Information density is kept moderate. Elements are grouped using generous whitespace to prevent the UI from feeling cluttered, which is essential for data-heavy agricultural dashboards. Vertical spacing between different sections should follow the "lg" (24px) or "xl" (32px) tokens to ensure clear separation of content blocks.

## Elevation & Depth
Elevation in this design system is expressed through **Tonal Layers** supplemented by **Ambient Shadows**. Following Material Design 3 logic, depth is primarily conveyed by surface color shifts (e.g., a card being slightly lighter than the background).

Shadows are never pure black; they are tinted with the **Muted Olive** secondary color at a very low opacity (8-12%). This creates a "soft lift" effect that feels more natural and less clinical. Shadows should have a large blur radius and minimal offset to mimic soft, overhead natural light.

## Shapes
The shape language is **Pill-shaped**, providing a friendly, modern, and highly accessible feel. A standard 1rem (16px) radius is applied to most UI components, such as input fields and small cards, creating a soft and approachable interface.

Larger containers and primary surface cards use a 2rem (32px) radius to emphasize the fluid, organic nature of the brand. Fully rounded "pill" shapes remain the standard for interactive elements like buttons and chips, ensuring they are clearly distinguishable from informational containers while maintaining a cohesive, ultra-rounded aesthetic across the entire system.

## Components
### Buttons
Buttons use the MD3 "Filled" and "Tonal" styles. Primary buttons are Sage Harvest with white text. Tonal buttons use a light version of the Muted Olive with dark green text for secondary actions. Due to the pill-shaped theme, all buttons utilize a full-radius design.

### Cards
CardViews are the primary vehicle for content. They feature a clear surface against the neutral-grey background, a 32px (2rem) corner radius for main containers, and a subtle olive-tinted shadow. Cards used for "Price Trends" include a dedicated slot for sparklines and iconography.

### Chips & Tags
Chips are used for filtering crop categories (e.g., Grains, Legumes). They utilize the MD3 "Filter Chip" style with a 1px border in the secondary olive when unselected, turning solid Sage Harvest when active. They are fully pill-shaped.

### Input Fields
Fields use the "Outlined" MD3 style. The border uses a subtle neutral-grey, which thickens and changes to Sage Harvest on focus. Fields use a 1rem radius to match the systematic roundedness. Error states use the standard error color defined in the palette.

### Price Trend Indicators
Price movements are visualized with clear, bold icons:
- **Upward Trend:** Sage Harvest upward arrow with a light green background tint.
- **Downward Trend:** Tertiary Earthen Gold downward arrow with a light gold background tint.
- **Stable:** Muted Olive horizontal dash.