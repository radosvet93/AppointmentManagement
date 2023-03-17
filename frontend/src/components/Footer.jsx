const Footer = () => {
  return (
    <footer>
      <p className="text-center text-zinc-200 text-xs italic py-8">
        &copy;{new Date().getFullYear()} Appointment manager. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
