import Navbar from "@shared/components/navbar";
import Footer from "@shared/components/Footer";

function OrganizationStructure() {
  return (
    <>
      <Navbar />
      <section className="py-24 bg-background-secondary">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-center text-5xl font-bold mb-20 text-foreground">
          Our Learning Ecosystem
        </h2>

        <div className="flex justify-center">
          <div className="bg-primary-600 text-white px-10 py-5 rounded-full text-xl font-bold">
            Bosscoder Academy
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mt-20">

          <div className="bg-surface border border-border p-8 rounded-3xl shadow-lg text-foreground">
            <h3 className="font-bold text-2xl mb-5">
              Online Programs
            </h3>

            <ul className="space-y-3 text-foreground-secondary">
              <li>React Development</li>
              <li>MERN Stack</li>
              <li>Python Full Stack</li>
              <li>AI Engineering</li>
            </ul>
          </div>

          <div className="bg-surface border border-border p-8 rounded-3xl shadow-lg text-foreground">
            <h3 className="font-bold text-2xl mb-5">
              Offline Campus
            </h3>

            <ul className="space-y-3 text-foreground-secondary">
              <li>B.Tech Programs</li>
              <li>Industry Labs</li>
              <li>Career Services</li>
            </ul>
          </div>

        </div>

      </div>

      </section>
      <Footer />
    </>
  );
}

export default OrganizationStructure;