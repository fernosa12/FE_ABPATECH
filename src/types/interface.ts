export interface RegisterInterface {
  email: string;
  password: string;
  confirm_password: string;
  mobile_number: string;
  foto: File | null;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface ProfileInterface {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}
export interface UserInterface {
  id: number;
  email: string;
  mobile_number: string;
  foto: string | null;
}

export interface DashboardInterface {
  users: UserInterface[];
}
export interface DashboardResponseInterface {
  status?: number;
  message?: string;
  data: {
    users: UserInterface[];
  };
}

export interface BannerInterface {
  banner_name: string;
  banner_image: string;
  description: string;
}

export interface ServiceInterface {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export interface BalanceInterface {
  balance: number;
}

export interface UserUpdateInterface {
  email: string;
  first_name: string;
  last_name: string;
}

export interface InformationInterface {
  profile: ProfileInterface;
  balance: BalanceInterface;
  showBalance: boolean;
  handleToggleBalance: () => void;
}

export interface TopUpInterface {
  top_up_amount: number;
}

export interface RecordInterface {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}

export interface TransactionInterface {
  offset: number;
  limit: number;
  records: RecordInterface[];
}
