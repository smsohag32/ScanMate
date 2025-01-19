import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";

const Footer = () => {
   const socialLinks = [
      {
         icon: <Github className="w-5 h-5" />,
         href: "https://github.com/smsohag32",
         label: "GitHub",
      },
      {
         icon: <Linkedin className="w-5 h-5" />,
         href: "https://www.linkedin.com/in/sohagsheik/",
         label: "LinkedIn",
      },
      {
         icon: <Twitter className="w-5 h-5" />,
         href: "https://twitter.com/yourtwitterhandle",
         label: "Twitter",
      },
      { icon: <Mail className="w-5 h-5" />, href: "mailto:sohagsheik32@gmail.com", label: "Email" },
   ];

   return (
      <footer className=" ">
         <div className="container mx-auto border-t py-6 border-white flex justify-center flex-col lg:flex-row gap-4 px-4 ">
            <p>
               Develop by{" "}
               <Link
                  to={"https://sohagsheik.vercel.app/"}
                  target="_blank"
                  className={buttonVariants({ variant: "link" })}>
                  Sohag Sheik
               </Link>{" "}
            </p>
            <div className="flex items-center gap-3 ">
               {socialLinks.map((link, index) => (
                  <a
                     key={index}
                     href={link.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-gray-600 hover:text-black transition-colors duration-300"
                     aria-label={link.label}>
                     {link.icon}
                  </a>
               ))}
            </div>
         </div>
      </footer>
   );
};

export default Footer;
