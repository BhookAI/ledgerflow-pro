# PROMPT PARA GENERAR PRESENTACIÓN DE LEDGERFLOW PRO

## CONTEXTO
Eres un experto en diseño de presentaciones comerciales para software B2B. Vas a crear una presentación profesional para presentar **LedgerFlow Pro** a un cliente potencial mañana.

---

## INFORMACIÓN DEL PRODUCTO

### Nombre y Tagline
- **Nombre**: LedgerFlow Pro
- **Tagline**: "Gestión empresarial inteligente para empresas de construcción e ingeniería"
- **Slogan**: "Contabilidad automatizada, gestión de proyectos y comunicación proactiva. Todo en una plataforma intuitiva."

### ¿Qué es LedgerFlow Pro?
LedgerFlow Pro es una plataforma integral de gestión empresarial diseñada específicamente para empresas de construcción, ingeniería y arquitectura. Combina herramientas tradicionales de gestión con inteligencia artificial avanzada para automatizar procesos administrativos y mejorar la toma de decisiones.

---

## MÓDULOS PRINCIPALES Y FUNCIONALIDADES

### 1. 📊 DASHBOARD EJECUTIVO
- **KPIs en tiempo real**: Ingresos, gastos, balance, documentos pendientes
- **Gráficos de flujo de caja**: Tendencias mensuales con proyecciones
- **Actividad reciente**: Últimas transacciones y movimientos
- **Widgets de productividad**: Deep Focus Mode (Pomodoro), alertas de bienestar

### 2. 👥 GESTIÓN DE CLIENTES (CRM)
- **Directorio completo**: Información de contacto, historial, estado
- **Códigos de acceso únicos**: Cada cliente recibe un código tipo "ACME-2026-XYZ" para acceder sin contraseñas
- **Pipeline de ventas**: Kanban de prospectos (Nuevos → Reunión → Propuesta → Negociación → Cerrado)
- **Contratos digitales**: Repositorio con hitos de pago y firmas digitales
- **Aprobaciones digitales**: Timeline de cambios aprobados por clientes
- **Portal de cliente**: Reportes mensuales auto-generados con avance, fotos y gastos

### 3. 🏗️ GESTIÓN DE PROYECTOS
- **Vista de lista**: Todos los proyectos con progreso, presupuesto y prioridad
- **Kanban board**: Columnas personalizables (Diseño, Permisos, Ejecución, Entrega)
- **Diagrama de Gantt**: Línea de tiempo visual con dependencias entre tareas
- **Códigos de acceso por proyecto**: Cada proyecto tiene código único para compartir con el cliente
- **Presupuestos y seguimiento**: Control de gastos vs presupuesto asignado

### 4. 💰 MÓDULO FINANCIERO AVANZADO
- **Transacciones**: Registro de ingresos y gastos con categorización
- **Dashboard multimoneda**: Soporte para EUR, USD, CRC, MXN, COP, ARS con conversión automática
- **Gráficos visuales**:
  - Área chart de ingresos vs gastos
  - Pie chart de distribución por categoría
  - Burn chart (costo real vs proyectado)
  - Cash flow (proyección 3/6/12 meses)
- **Separador inteligente de gastos**: Algoritmo que detecta gastos de tarjeta y pide asignarlos a proyecto o marcar como personal
- **Calculadora de impuestos**: IVA recaudado vs pagado, cálculo automático a pagar
- **Fondo de emergencia/ahorro**: Automatización del 10% de ganancias a fondo de reserva
- **Importación con IA**: Extracción automática de datos desde PDFs, imágenes de recibos y Excel
- **Integración email**: Conexión con Gmail/Outlook para extraer facturas automáticamente

### 5. 🤖 AGENTE IA (Chatbot Empresarial)
- **Acceso total a datos**: Clientes, proyectos, finanzas y documentos
- **Consultas naturales**: "¿Cuál es el resumen financiero de este mes?", "¿Cuántos clientes activos tengo?"
- **Análisis contextual**: El agente comprende relaciones entre datos
- **Sugerencias proactivas**: Detecta patrones y alerta oportunidades/riesgos

### 6. 🧠 AI BRAIN CENTRAL (Suite de Inteligencia Artificial)
- **Chat Central**: Asistente principal con memoria de conversaciones
- **Búsqueda semántica**: Encuentra información en documentos antiguos usando lenguaje natural
- **Analista de riesgos predictivo**: 
  - Detección de riesgos de atraso por clima
  - Alertas de fluctuación de precios de materiales
  - Salud general del portafolio de proyectos
- **Generador de Prompts para Midjourney**: Crea prompts profesionales para renders arquitectónicos
- **Resumen de reuniones**: Transcripción de audio/video y extracción de acuerdos

### 7. 📄 GESTIÓN DE DOCUMENTOS CON IA
- **Procesamiento OCR**: Extrae texto de PDFs, imágenes, Excel
- **Clasificación automática**: Identifica tipo de documento (factura, recibo, contrato)
- **Extracción de datos**: Montos, fechas, proveedores, conceptos
- **Confianza scoring**: Porcentaje de certeza en la extracción
- **Reprocesamiento**: Si hay errores, se puede reintentar
- **Formatos soportados**: PDF, JPG, PNG, XLSX, CSV, DOCX, TXT, XML (CFDI/UBL)

### 8. 🔐 PORTAL DE CLIENTE
- **Acceso sin contraseña**: Solo con código único personal
- **Vista personalizada**: Solo ve sus proyectos y documentos
- **Reportes auto-generados**: 
  - Resumen ejecutivo con IA
  - Bitácora de campo con fotos
  - Avance visual (Gantt/Kanban)
  - Estado financiero del proyecto
- **Descarga PDF**: Reporte encriptado listo para enviar

### 9. 🗄️ SISTEMA RAG (Retrieval-Augmented Generation)
- **Procesamiento masivo**: Ingesta de carpetas completas de documentos
- **Embeddings vectoriales**: Almacenamiento en ChromaDB para búsqueda semántica
- **Multi-tenancy aislado**: Cada cliente tiene su espacio de datos separado
- **Consultas inteligentes**: "¿Cuánto gastamos en marzo?", "Facturas pendientes del proveedor X"

---

## BENEFICIOS CLAVE PARA EL CLIENTE

1. **Ahorro de tiempo**: 10x más rápido procesando documentos
2. **Reducción de errores**: 99% precisión en extracción de datos con IA
3. **Menos tareas administrativas**: 50% reducción en trabajo manual
4. **Disponibilidad 24/7**: Acceso desde cualquier dispositivo
5. **Transparencia con clientes**: Portal propio para cada cliente
6. **Toma de decisiones informada**: Dashboards y análisis predictivo
7. **Cumplimiento fiscal**: Calculadora de impuestos y separación de gastos
8. **Sin contraseñas complejas**: Acceso por códigos simples

---

## ESPECIFICACIONES TÉCNICAS

### Stack Tecnológico
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: API Routes de Next.js, Server Actions
- **Base de datos**: PostgreSQL (Supabase)
- **Autenticación**: Supabase Auth (JWT)
- **Almacenamiento**: Supabase Storage
- **IA/ML**: OpenAI, OpenRouter, Anthropic, LangChain
- **Vector DB**: ChromaDB para embeddings
- **Gráficos**: Recharts
- **Animaciones**: Framer Motion

### Seguridad
- Encriptación en tránsito y reposo
- Autenticación JWT con refresh tokens
- Rate limiting
- CORS configurado
- Sanitización de inputs
- Multi-tenancy aislado

### Idiomas Soportados
- Español, Inglés, Portugués, Francés

### Monedas Soportadas
- EUR, USD, GBP, MXN, COP, ARS (con conversión automática)

---

## ESTRUCTURA DE LA PRESENTACIÓN REQUERIDA

### Slide 1: Portada
- Logo LedgerFlow Pro
- Tagline principal
- Espacio para nombre del cliente y fecha

### Slide 2: El Problema
- Dolor administrativo en empresas de construcción
- Desorganización de documentos
- Falta de visibilidad financiera en tiempo real
- Comunicación fragmentada con clientes

### Slide 3: La Solución - LedgerFlow Pro
- Visión general de la plataforma
- Screenshots del dashboard (describir visual)
- "Todo en un solo lugar"

### Slide 4: Módulo de Finanzas Inteligente
- Dashboard financiero multimoneda
- Procesamiento de documentos con IA
- Separador inteligente de gastos
- Calculadora de impuestos

### Slide 5: Gestión de Proyectos
- Vista Kanban
- Diagrama de Gantt
- Seguimiento de presupuestos
- Códigos de acceso

### Slide 6: CRM y Portal de Clientes
- Directorio de clientes
- Pipeline de ventas
- Portal cliente con código único
- Reportes auto-generados

### Slide 7: Inteligencia Artificial Integrada
- Agente IA conversacional
- AI Brain Central (búsqueda semántica, analista de riesgos)
- Generador de prompts para renders
- Resumen de reuniones

### Slide 8: Procesamiento de Documentos
- OCR inteligente
- Formatos soportados
- Extracción automática de datos
- Integración con Gmail/Outlook

### Slide 9: Beneficios y ROI
- 10x más rápido en documentos
- 50% menos tareas administrativas
- 99% precisión en datos
- Disponibilidad 24/7

### Slide 10: Seguridad y Tecnología
- Stack tecnológico moderno
- Encriptación y seguridad
- Multi-idioma y multi-moneda
- Escalable y cloud-native

### Slide 11: Casos de Uso / Demo
- Ejemplo práctico: "Un día en LedgerFlow Pro"
- Flujo: Documento llega → IA procesa → Finanzas actualizadas → Cliente notificado

### Slide 12: Inversión y Siguientes Pasos
- Opciones de pricing (mencionar que es personalizado)
- Onboarding incluido
- Soporte técnico
- CTA: "Agenda tu demo personalizada"

---

## INSTRUCCIONES DE DISEÑO

### Paleta de Colores
- **Primario**: Indigo (#6366f1) - Violeta (#8b5cf6)
- **Éxito**: Emerald (#10b981)
- **Alerta**: Amber (#f59e0b)
- **Error**: Rose (#f43f5e)
- **Fondos**: Dark mode profesional (grises oscuros #0f111a, #1a1d2e)
- **Texto**: Blanco y grises claros para contraste

### Estilo Visual
- Moderno, minimalista, profesional
- Elementos de "glassmorphism" (transparencias)
- Iconos de Lucide React (estilo lineal)
- Tipografía: Space Mono para números/códigos, sans-serif general
- Espaciado amplio, aireado

### Elementos Visuales a Incluir
- Mockups de la interfaz dark mode
- Íconos representativos por módulo
- Gráficos de métricas (barras, líneas, pie)
- Diagrama de flujo simple del proceso
- Screenshots conceptuales (descritos textualmente)

---

## NOTAS ADICIONALES

- **Público objetivo**: Directores de empresas de construcción, ingeniería, arquitectura (15-100 empleados)
- **Tono**: Profesional, innovador, confiable, moderno
- **Duración estimada**: Presentación de 15-20 minutos
- **Formato de salida**: Sugerir PowerPoint, Google Slides o PDF
- **Call to action final**: Demo personalizada de 30 minutos

---

## PROMPT FINAL PARA LA IA GENERADORA

"Crea una presentación comercial profesional de 12 slides para LedgerFlow Pro, un software de gestión empresarial con IA para empresas de construcción. 

Usa la información detallada arriba. Diseño moderno dark mode con acentos en indigo/violeta. Incluye mockups visuales descriptivos de la interfaz. 

Tono profesional, innovador y orientado a resultados. Cada slide debe tener título claro, contenido conciso y elementos visuales descriptivos (no generar imágenes reales, solo describir qué elementos visuales irían).

La presentación debe convencer al cliente de que LedgerFlow Pro es la solución integral que necesita para modernizar su gestión empresarial."

---

**Generado por**: Asistente de LedgerFlow Pro
**Fecha**: 2026-03-11
**Para presentación**: Cliente potencial - Mañana
