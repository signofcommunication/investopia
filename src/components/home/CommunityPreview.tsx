import { Typography, Card, CardBody } from "@material-tailwind/react";
import { FaWhatsapp, FaDiscord } from "react-icons/fa";

const CommunityPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-8 text-center">
        <Typography
          variant="h3"
          className="font-bold mb-4"
          placeholder=" "
          onResize={() => {}}
          onResizeCapture={() => {}}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          Komunitas Investopia
        </Typography>

        <Typography
          className="text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed"
          placeholder=" "
          onResize={() => {}}
          onResizeCapture={() => {}}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          Gabung ke komunitas WhatsApp & Discord untuk diskusi harian, insight
          pasar, dan tanya jawab langsung dengan mentor serta peserta lainnya.
        </Typography>

        {/* Social Cards */}
        <div className="flex justify-center gap-8 flex-wrap">
          {/* WhatsApp */}
          <Card
            className="w-60 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl hover:-translate-y-1"
            placeholder=" "
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <CardBody
              className="flex flex-col items-center gap-4 p-6"
              placeholder=" "
              onResize={() => {}}
              onResizeCapture={() => {}}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
                <FaWhatsapp className="text-green-600 text-4xl" />
              </div>

              <Typography
                variant="h6"
                className="font-bold"
                placeholder=" "
                onResize={() => {}}
                onResizeCapture={() => {}}
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                WhatsApp Group
              </Typography>

              <a
                href="https://wa.me/628000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-medium hover:underline"
              >
                Bergabung Sekarang →
              </a>
            </CardBody>
          </Card>

          {/* Discord */}
          <Card
            className="w-60 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl hover:-translate-y-1"
            placeholder=" "
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <CardBody
              className="flex flex-col items-center gap-4 p-6"
              placeholder=" "
              onResize={() => {}}
              onResizeCapture={() => {}}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-indigo-100">
                <FaDiscord className="text-indigo-600 text-4xl" />
              </div>

              <Typography
                variant="h6"
                className="font-bold"
                placeholder=" "
                onResize={() => {}}
                onResizeCapture={() => {}}
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              >
                Discord Server
              </Typography>

              <a
                href="https://discord.gg/TNEJSthQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-medium hover:underline"
              >
                Bergabung Sekarang →
              </a>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommunityPreview;
