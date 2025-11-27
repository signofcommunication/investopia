import { Card, CardBody, Typography } from "@material-tailwind/react";
import { AcademicCapIcon } from "@heroicons/react/24/solid";

type LevelItem = {
  title: string;
  desc: string;
  color: string;
};

const levels: LevelItem[] = [
  {
    title: "Basic Level",
    desc: "Mengenal dasar-dasar investasi, jenis instrumen, dan terminologi pasar modal.",
    color: "blue",
  },
  {
    title: "Intermediate Level",
    desc: "Analisis laporan keuangan, membaca grafik, strategi menengah.",
    color: "green",
  },
  {
    title: "Advanced Level",
    desc: "Valuasi saham, manajemen risiko lanjutan, dan studi kasus kompleks.",
    color: "purple",
  },
];

const LevelsSection = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Level Pembelajaran
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {levels.map(level => (
            <Card
              key={level.title}
              className="shadow-md hover:shadow-xl transition-all duration-300 rounded-xl border border-gray-100 hover:-translate-y-1 bg-white"
            >
              <CardBody className="text-center space-y-4">
                {/* Icon Wrapper */}
                <div
                  className={`mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-${level.color}-100`}
                >
                  <AcademicCapIcon
                    className={`h-8 w-8 text-${level.color}-600`}
                  />
                </div>

                <Typography
                  variant="h5"
                  className={`font-bold text-${level.color}-700`}
                >
                  {level.title}
                </Typography>

                <Typography className="text-gray-600 leading-relaxed">
                  {level.desc}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LevelsSection;
