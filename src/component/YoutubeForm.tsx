import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
};

export const YoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
    },

    // {
    //     defaultValues: async () => {
    //       const response = await fetch(
    //         "https://jsonplaceholder.typicode.com/users/1"
    //       );
    //       const data = await response.json();
    //       return {
    //         username: data?.username,
    //         email: data?.email,
    //         channel: "",
    //       };
    //     },
    //   }
  });
  renderCount++;

  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  return (
    <div>
      <h1>Youtube Form ({renderCount / 2})</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          {errors.username ? (
            <label className="error">{errors.username.message}</label>
          ) : (
            <label htmlFor="username">Username</label>
          )}
          <input
            type="text"
            id="username"
            {...register("username", {
              required: { value: true, message: "Username is required" },
            })}
          />
        </div>

        <div className="form-control">
          {errors.email ? (
            <label className="error">{errors.email.message}</label>
          ) : (
            <label htmlFor="email">Email</label>
          )}
          <input
            type="email"
            id="email"
            {...register("email", {
              //   required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email format",
              },
              //   validate: (fieldValue) => {
              //     return (
              //       fieldValue != "admin@example.com" ||
              //       "Enter a different email address"
              //     );
              //   },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue != "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
          />
        </div>

        <div className="form-control">
          {errors.channel ? (
            <label className="error">{errors.channel.message}</label>
          ) : (
            <label htmlFor="channel">Channel</label>
          )}
          <input type="text" id="channel" {...register("channel")} />
        </div>

        <div className="form-control">
          {errors.social?.twitter ? (
            <label className="error">{errors.social.twitter.message}</label>
          ) : (
            <label htmlFor="twitter">Twitter</label>
          )}
          <input
            type="email"
            id="twitter"
            {...register("social.twitter", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@x\.com$/i,
                message: "Twitter email must end with @x.com",
              },
            })}
          />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@meta\.com$/i,
                message: "Facebook email must end with @meta.com",
              },
            })}
          />
        </div>

        <div className="form-control">
          {errors.phoneNumbers?.[0] ? (
            <label className="error">{errors.phoneNumbers[0].message}</label>
          ) : (
            <label htmlFor="primary-phone-number">Primary Phone Number</label>
          )}
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0", {
              required: { value: true, message: "Primary phone is required" },
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Invalid phone number",
              },
            })}
          />
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary Phone Number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
