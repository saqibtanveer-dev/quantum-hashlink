import { Card, CardContent } from "@/components/ui/card";

const SingleFeature = ({ feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <Card className="border-gray-100 shadow-sm transition hover:shadow-md hover:border-primary/20">
      <CardContent className="p-6">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="mb-3 text-lg font-bold text-gray-900">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-body-color">
          {paragraph}
        </p>
      </CardContent>
    </Card>
  );
};

export default SingleFeature;
