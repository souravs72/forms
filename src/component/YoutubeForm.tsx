import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

export const YoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
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

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
