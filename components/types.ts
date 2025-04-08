import { getTheme } from "@theme/theme";



export const flightTypeOptions = Array.from(
    new Set(["X-Country", "X-Country Training",  "General", "Maintenances", "Training"])
  );

export interface Booking { 
    id?: string; // Optional for new records.
    profile_id: string;
    resource_id: string;
    start_time: string;
    end_time: string;
    title?: string;
    notes?: string;
    instructor_id?: string;
    flight_type?: string;
    created_at?: string;
    updated_at?: string;
}

export interface BookingResource {
  id: string;
  name: string;
}

export interface Instructor {
  id: string;
  name: string;
}

export interface BookingInstructor {
    id: string;
    name: string;
}

export interface BookingModalProps {
  open: boolean;
  booking: Booking | null;
  isEditable: boolean;
  instructors: BookingInstructor[];
  onClose: () => void;
  onSave: (booking: Booking) => void;
  onDelete: (bookingId: string) => void;
}

// --------------------
// Interfaces
// --------------------

export interface Blog {
  id: string;
  profile_id: string;
  title: string;
  content: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  image_link?: string;
}

export interface LogBookEntry {
  id: string;
  flight_date: string;
  flightHours: number;
}

export interface Resource {
  id: number;
  resource_type: "aircraft" | "simulator" | "classroom";
  name: string;
  status: "available" | "maintenance" | "booked";
  created_at: string;
  updated_at: string;
  // Optionally, aggregated fields might be stored in the record.
}

export interface FlightPlan {
  id: string;
  profile_id: string;
  route: string;
  notes?: string;
  international?: boolean;
  created_at: string;
  updated_at: string;
}
export interface Instructor {
  id: string;
  profile_id: string;
  rating_level?: string;
  availability?: {
      PPL?: boolean;
      LAPL?: boolean;
      NF?: boolean;
      IR?: boolean;
      Kertauskoulutus?: boolean;
      Veloitus?: string;
      [key: string]: string | boolean | undefined;
  };
  created_at: string;
  updated_at: string;
}

export interface SectionProps {
  title: string;
  content: string;
  linkText?: string;
  linkUrl?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface Logbook {
  id: number;
  profile_id: string;
  resource_id: number;
  flight_date: string; // ISO date string
  flight_time: number;
  notes?: string;
  block_off_time?: string;
  takeoff_time?: string;
  landing_time?: string;
  block_on_time?: string;
  block_time?: number;
  landings?: number;
  flight_details: Record<string, any>;
  fuel_left?: number;
  billing_info?: string;
  pax?: number;
  departure_place?: string;
  arrival_place?: string;
  flight_type?: string;
  pic_id?: string;
  student_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Profiles {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
    avatar_url?: string;
    created_at: string;
    updated_at: string;
}

export interface ProfileData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  avatar_url?: string;
  ratings: string[]; 
  flight_hours?: Record<string, number>;
}

export interface NoticeData {
  title: string;
  message: string;
  time_off_incident?: string;
  extra_parameters?: {
    conditions: string[];
    severity: string;
  };
  created_at: string;
  updated_at: string;
}

export interface AuthIdentity {
  id: string;
  role?: string;
}

export interface DashboardCardProps {
    title: string;
    description: string;
    link: string;
    buttonText: string;
    external?: boolean;
    theme: ReturnType<typeof getTheme>;
}
