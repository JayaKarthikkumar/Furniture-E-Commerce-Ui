import React, { useState, ChangeEvent } from "react";
import { ChevronDown, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  townCity: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  additionalInfo: string;
  paymentMethod: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  country?: string;
  streetAddress?: string;
  townCity?: string;
  province?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

const BillingDetails: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "Sri Lanka",
    streetAddress: "",
    townCity: "",
    province: "Western Province",
    zipCode: "",
    phone: "",
    email: "",
    additionalInfo: "",
    paymentMethod: "direct-bank",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);

  const showToast = (message: string, type: Toast['type']) => {
    const id = Date.now();
    const newToast: Toast = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateZipCode = (zipCode: string): boolean => {
    return zipCode.trim().length >= 3;
  };

  const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
        if (!validateRequired(value)) return 'First name is required';
        if (value.length < 2) return 'First name must be at least 2 characters';
        break;
      case 'lastName':
        if (!validateRequired(value)) return 'Last name is required';
        if (value.length < 2) return 'Last name must be at least 2 characters';
        break;
      case 'streetAddress':
        if (!validateRequired(value)) return 'Street address is required';
        break;
      case 'townCity':
        if (!validateRequired(value)) return 'Town/City is required';
        break;
      case 'zipCode':
        if (!validateRequired(value)) return 'ZIP code is required';
        if (!validateZipCode(value)) return 'ZIP code must be at least 3 characters';
        break;
      case 'phone':
        if (!validateRequired(value)) return 'Phone number is required';
        if (!validatePhone(value)) return 'Please enter a valid phone number';
        break;
      case 'email':
        if (!validateRequired(value)) return 'Email address is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        break;
      case 'country':
        if (!validateRequired(value)) return 'Please select a country';
        break;
      case 'province':
        if (!validateRequired(value)) return 'Please select a province';
        break;
    }
    return undefined;
  };

  const validateForm = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};
    const requiredFields = ['firstName', 'lastName', 'streetAddress', 'townCity', 'zipCode', 'phone', 'email', 'country', 'province'];
    
    requiredFields.forEach(field => {
      const error = validateField(field, data[field as keyof FormData]);
      if (error) {
        newErrors[field as keyof FormErrors] = error;
      }
    });
    
    return newErrors;
  };

  const isFormValid = (): boolean => {
    const formErrors = validateForm(formData);
    return Object.keys(formErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    const newFormData = {
      ...formData,
      [name]: value,
    };
    
    setFormData(newFormData);

    if (touchedFields.has(name)) {
      const fieldError = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouchedFields(prev => new Set([...prev, fieldName]));
    const fieldError = validateField(fieldName, formData[fieldName as keyof FormData]);
    setErrors(prev => ({
      ...prev,
      [fieldName]: fieldError,
    }));

    if (fieldError) {
      showToast(`Please fix the error in ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method,
    }));
  };

  const handlePlaceOrder = () => {
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    setTouchedFields(new Set(Object.keys(formData)));

    if (Object.keys(formErrors).length === 0) {
      setIsProcessing(true);
      showToast('Processing your order...', 'info');
      
      setTimeout(() => {
        const orderData = {
          billing: formData,
          items: [{
            name: "Asgaard sofa",
            quantity: 1,
            price: 250000.00
          }],
          total: 250000.00
        };
        
        console.log("Order placed:", orderData);
        setIsProcessing(false);
        showToast('Order placed successfully! You will receive a confirmation email shortly.', 'success');
      }, 2000);
    } else {
      showToast('Please fix the errors in the form before placing your order', 'error');
    }
  };

  const getInputClassName = (fieldName: string) => {
    const hasError = errors[fieldName as keyof FormErrors];
    const isTouched = touchedFields.has(fieldName);
    const hasValue = formData[fieldName as keyof FormData]?.trim().length > 0;

    if (hasError && isTouched) return "w-full px-4 py-3 border border-red-500 rounded-lg text-base text-gray-700 bg-red-50 outline-none transition-all duration-200";
    if (!hasError && isTouched && hasValue) return "w-full px-4 py-3 border border-green-500 rounded-lg text-base text-gray-700 bg-green-50 outline-none transition-all duration-200";
    return "w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-700 bg-white outline-none transition-all duration-200";
  };

  const getToastClassName = (type: Toast['type']) => {
    const baseClasses = "p-3 rounded-lg text-white flex items-center gap-2 min-w-[300px] cursor-pointer transition-transform duration-200 shadow-lg";
    const typeClasses = {
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-yellow-500",
      info: "bg-blue-500",
    };
    return `${baseClasses} ${typeClasses[type]}`;
  };

  const getToastIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success': return <CheckCircle size={20} />;
      case 'error': return <XCircle size={20} />;
      case 'warning': return <AlertCircle size={20} />;
      case 'info': return <AlertCircle size={20} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white min-h-screen relative">
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={getToastClassName(toast.type)}
            onClick={() => removeToast(toast.id)}
          >
            {getToastIcon(toast.type)}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-16 items-start">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-semibold text-black mb-8">Billing details</h2>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-black font-medium mb-2 text-base">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('firstName')}
                  className={getInputClassName('firstName')}
                />
                {errors.firstName && touchedFields.has('firstName') && (
                  <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <XCircle size={16} />
                    {errors.firstName}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col">
                <label className="block text-black font-medium mb-2 text-base">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('lastName')}
                  className={getInputClassName('lastName')}
                />
                {errors.lastName && touchedFields.has('lastName') && (
                  <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <XCircle size={16} />
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block text-black font-medium mb-2 text-base">Company Name (Optional)</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-700 bg-white outline-none transition-all duration-200"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-black font-medium mb-2 text-base">Country / Region</label>
              <div className="relative">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('country')}
                  className={`${getInputClassName('country')} pr-10 appearance-none`}
                >
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <ChevronDown size={20} />
                </div>
              </div>
              {errors.country && touchedFields.has('country') && (
                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <XCircle size={16} />
                  {errors.country}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label className="block text-black font-medium mb-2 text-base">Street address</label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                onBlur={() => handleBlur('streetAddress')}
                className={getInputClassName('streetAddress')}
              />
              {errors.streetAddress && touchedFields.has('streetAddress') && (
                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <XCircle size={16} />
                  {errors.streetAddress}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label className="block text-black font-medium mb-2 text-base">Town / City</label>
              <input
                type="text"
                name="townCity"
                value={formData.townCity}
                onChange={handleInputChange}
                onBlur={() => handleBlur('townCity')}
                className={getInputClassName('townCity')}
              />
              {errors.townCity && touchedFields.has('townCity') && (
                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <XCircle size={16} />
                  {errors.townCity}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label className="block text-black font-medium mb-2 text-base">Province</label>
              <div className="relative">
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('province')}
                  className={`${getInputClassName('province')} pr-10 appearance-none`}
                >
                  <option value="Western Province">Western Province</option>
                  <option value="Central Province">Central Province</option>
                  <option value="Eastern Province">Eastern Province</option>
                  <option value="Southern Province">Southern Province</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <ChevronDown size={20} />
                </div>
              </div>
              {errors.province && touchedFields.has('province') && (
                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <XCircle size={16} />
                  {errors.province}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label className="block text-black font-medium mb-2 text-base">ZIP code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                onBlur={() => handleBlur('zipCode')}
                className={getInputClassName('zipCode')}
              />
              {errors.zipCode && touchedFields.has('zipCode') && (
                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <XCircle size={16} />
                  {errors.zipCode}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label className="block text-black font-medium mb-2 text-base">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={() => handleBlur('phone')}
                className={getInputClassName('phone')}
              />
              {errors.phone && touchedFields.has('phone') && (
                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <XCircle size={16} />
                  {errors.phone}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label className="block text-black font-medium mb-2 text-base">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => handleBlur('email')}
                className={getInputClassName('email')}
              />
              {errors.email && touchedFields.has('email') && (
                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <XCircle size={16} />
                  {errors.email}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Additional information"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-gray-700 bg-white outline-none transition-all duration-200 resize-y min-h-[120px]"
              />
            </div>
          </div>
        </div>

        <div className="w-96 flex-shrink-0">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-black">Product</h3>
              <h3 className="text-xl font-semibold text-black">Subtotal</h3>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">
                  Asgaard sofa <span className="text-black">x 1</span>
                </span>
                <span className="text-black">Rs. 250,000.00</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-black">Subtotal</span>
                <span className="text-black">Rs. 250,000.00</span>
              </div>

              <div className="flex justify-between items-center text-lg font-medium">
                <span className="text-black">Total</span>
                <span className="text-yellow-600 text-xl font-bold">Rs. 250,000.00</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => handlePaymentMethodChange("direct-bank")}
                >
                  <div className="relative">
                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                      formData.paymentMethod === "direct-bank"
                        ? "border-black bg-black"
                        : "border-gray-400 bg-transparent"
                    }`}>
                      {formData.paymentMethod === "direct-bank" && (
                        <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-black font-medium">Direct Bank Transfer</span>
                </label>
                <p className="text-gray-500 text-sm mt-2 ml-7 leading-relaxed">
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not
                  be shipped until the funds have cleared in our account.
                </p>
              </div>

              <div className="flex flex-col">
                <label
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => handlePaymentMethodChange("direct-bank-alt")}
                >
                  <div className="relative">
                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                      formData.paymentMethod === "direct-bank-alt"
                        ? "border-black bg-black"
                        : "border-gray-400 bg-transparent"
                    }`}>
                      {formData.paymentMethod === "direct-bank-alt" && (
                        <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-500">Direct Bank Transfer</span>
                </label>
              </div>

              <div className="flex flex-col">
                <label
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => handlePaymentMethodChange("cash-on-delivery")}
                >
                  <div className="relative">
                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                      formData.paymentMethod === "cash-on-delivery"
                        ? "border-black bg-black"
                        : "border-gray-400 bg-transparent"
                    }`}>
                      {formData.paymentMethod === "cash-on-delivery" && (
                        <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-500">Cash On Delivery</span>
                </label>
              </div>
            </div>
          </div>

          <div className="text-black text-sm leading-relaxed mb-6">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our{" "}
            <span className="font-semibold">privacy policy.</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={!isFormValid() || isProcessing}
            className={`w-full px-6 py-3 border-none text-white font-medium rounded-lg text-base transition-all duration-200 ${
              isFormValid() 
                ? "bg-black cursor-pointer opacity-100" 
                : "bg-gray-400 cursor-not-allowed opacity-60"
            }`}
          >
            {isProcessing ? 'Processing...' : 'Place order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;