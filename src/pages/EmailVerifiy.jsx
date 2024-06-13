import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updateVerify } from "../appwrite/auth";

function EmailVerifiy() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const userId = params.get("userId");
  console.log("userId : ", userId);
  const secret = params.get("secret");
  console.log("secret : ", secret);

  const Verify = async () => {
    try {
      const verified = await updateVerify({ userId, secret });
      if (verified) {
        console.log("verified : ", verified);
        // navigate("/dashboard");
      } else {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (secret != "") {
    Verify();
  } else {
    console.log("can't verified.");
  }

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}

export default EmailVerifiy;

// import React from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { updateVerify } from "../appwrite/auth";

// function EmailVerifiy() {
//   const navigate = useNavigate();
//   const [params] = useSearchParams();
//   const userId = params.get("userId");
//   console.log(userId);
//   const secret = params.get("secret");
//   console.log(secret);
//   if (secret != "") {
//     Verify();
//   } else {
//     console.log("can't verified.")
//   }

//   const Verify = async () => {
//     try {
//       const verified = await updateVerify(userId, secret);
//       if (verified) {
//         navigate("/dashboard");
//       } else {
//         // navigate("/");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div>
//       <h1>Email Verify</h1>
//     </div>
//   );
// }

// export default EmailVerifiy;
