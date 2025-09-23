import Navbar from "./components/Navbar";

export default function LayoutWithNavbar({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      {modal}
      <div id="modal-root"></div>
    </>
  );
}
