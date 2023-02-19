import CatalogCard from "../CatalogCard";

export default function Catalog() {
  return (
    <div className="flex flex-col items-center pt-6">
      <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
        Catalog
      </h3>
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-5">
        <CatalogCard
          stuffLink={"TextSphere"}
          commentaryLink={"stub"}
          title={"Text Sphere"}
          description={
            "Text displayed on the surface of a sphere, with added mouse rotate."
          }
        />
        <CatalogCard
          stuffLink={"CameraTransition"}
          commentaryLink={"stub"}
          title={"Camera Transitions"}
          description={"Some camera transitions activated with mouse clicks."}
        />
        <CatalogCard
          stuffLink={"ObjectFunnel"}
          commentaryLink={"stub"}
          title={"Cube Rain"}
          description={
            "Bunch of cubes falling endlessly (sort of) in a physics simulation."
          }
        />
        <CatalogCard
          stuffLink={"PerlinSphere"}
          commentaryLink={"stub"}
          title={"Perlin Sphere"}
          description={"Sphere with Perlin Noise applied to its shader."}
        />
        <CatalogCard
          stuffLink={"FlightGame"}
          commentaryLink={"stub"}
          title={"Simple Flight Game"}
          description={
            "Simple flight game, use the mouse to determine where you fly to, and WASD to move along the camera plane."
          }
        />
      </div>
    </div>
  );
}
