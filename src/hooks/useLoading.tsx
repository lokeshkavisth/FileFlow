import React, { Dispatch, SetStateAction, useState } from "react";

const useLoading = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [loading, setLoading] = useState<boolean>(false);

  return [loading, setLoading];
};

export default useLoading;
