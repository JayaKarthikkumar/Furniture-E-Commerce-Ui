import React from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import HighQualityCard from "../../components/Card/HighQualityCard";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, CardMedia, Typography, Breadcrumbs, Link } from "@mui/material";
import Shopbanner from "../../assets/Banner.jpg";
import logo from "../../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string(),
  message: Yup.string().required("Message is required"),
});

const StyledErrorMessage: React.FC<{ name: string; className?: string }> = ({
  name,
  className,
}) => (
  <ErrorMessage name={name}>
    {(msg) => <div className={className}>{msg}</div>}
  </ErrorMessage>
);

const ContactPage: React.FC = () => {
  const handleSubmit = (values: any, { resetForm }: any) => {
    console.log("Form submitted:", values);
    toast.success("Form submitted successfully! 🎉");
    resetForm();
  };

  return (
    <>
      <Navbar />
      <Box width="100%" display="flex" justifyContent="center">
      <Box position="relative" width="100%" maxWidth="1600px" height="300px">
        <CardMedia
          component="img"
          image={Shopbanner}
          alt="Hero Banner"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            color: "black",
            textAlign: "center",
            background: "rgba(0,0,0,0.4)",
          }}
        >
          <Box>
            <img src={logo} alt="Logo" style={{ height: 40 }} />
          </Box>
          <Typography variant="h3" fontWeight="bold" mt={1}>
            Contact
          </Typography>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              color: "black",
              "& .MuiBreadcrumbs-separator": { color: "black" },
              "& a": { color: "black", textDecoration: "none" },
            }}
          >
            <Link href="/home">Home</Link>
            <Typography color="black">Contact</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
    </Box>

      <div className="max-w-[1200px] mx-auto px-4 py-16 bg-white min-h-screen font-sans">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-6 leading-tight">
            Get In Touch With Us
          </h1>
          <p className="text-gray-500 max-w-[600px] mx-auto leading-relaxed text-base">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-12">
            <div className="flex items-start gap-4">
              <MapPin className="flex-shrink-0 mt-1 text-black" size={24} />
              <div>
                <h3 className="text-lg font-medium text-black mb-3">Address</h3>
                <p className="text-black leading-relaxed">
                  236 5th SE Avenue, New
                  <br />
                  York NY10000, United
                  <br />
                  States
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="flex-shrink-0 mt-1 text-black" size={24} />
              <div>
                <h3 className="text-lg font-medium text-black mb-3">Phone</h3>
                <p className="text-black leading-relaxed">
                  Mobile: +(84) 546-6789
                  <br />
                  Hotline: +(84) 456-6789
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="flex-shrink-0 mt-1 text-black" size={24} />
              <div>
                <h3 className="text-lg font-medium text-black mb-3">
                  Working Time
                </h3>
                <p className="text-black leading-relaxed">
                  Monday-Friday: 9:00 - 22:00
                  <br />
                  Saturday-Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>
          </div>

          <div>
            <Formik
              initialValues={{ name: "", email: "", subject: "", message: "" }}
              validationSchema={ContactSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-6">
                  <div>
                    <label className="block text-black font-medium mb-2">
                      Your Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-base bg-white outline-none transition-all"
                    />
                    <StyledErrorMessage
                      name="name"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-black font-medium mb-2">
                      Email Address
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-base bg-white outline-none transition-all"
                    />
                    <StyledErrorMessage
                      name="email"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-black font-medium mb-2">
                      Subject
                    </label>
                    <Field
                      type="text"
                      name="subject"
                      placeholder="Enter subject (optional)"
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-base bg-white outline-none transition-all"
                    />
                    <StyledErrorMessage
                      name="subject"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-black font-medium mb-2">
                      Message
                    </label>
                    <Field
                      as="textarea"
                      name="message"
                      placeholder="Enter your message"
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-base bg-white outline-none transition-all resize-y min-h-[120px]"
                    />
                    <StyledErrorMessage
                      name="message"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-[#B88E2F] text-white font-medium px-12 py-3 rounded-lg text-base transition-colors self-start ${
                      isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-[#a47d29]"
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <HighQualityCard />
      <Footer />

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ContactPage;
