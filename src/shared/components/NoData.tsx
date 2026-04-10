import Link from "next/link";
import { Button } from "./Button";

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center ">
      <h2 className="text-xl font-semibold ">No Projects yet</h2>
      <p className="text-gray-400 mt-2 max-w-md">
        Looks like you haven’t have any projects yet.
      </p>
      {/* <Link to="/products">
        <Button type="button" variant="outline" className="mt-4">
          Shop Now
        </Button>
      </Link> */}
    </div>
  );
};

export default NoData;
