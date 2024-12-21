import Loader from "@/components/admin/elements/loader";
import AdminLayout from "@/components/admin/layouts";
import { isTokenExpired } from "@/lib/auth";
import { montserrat } from "@/lib/fonts";
import { GetServerSideProps } from "next";
import React from "react";
import { BiEdit } from "react-icons/bi";
import Cookies from "cookies";
import { useAdminPackages } from "@/hooks/admin/useAdminPackages";
import Input from "@/components/admin/elements/input";
import InputCheckbox from "@/components/admin/elements/input.checkbox";
import ButtonPrimary from "@/components/admin/elements/button.primary";

interface PackagesDashboardProps {
  token: string | null;
}

const PackagesDashboard: React.FC<PackagesDashboardProps> = ({ token }) => {
  const { state, actions } = useAdminPackages(token);

  return (
    <AdminLayout>
      <div className={`w-full ${montserrat.className}`}>
        <h1 className="text-2xl font-bold mb-4">Packages Dashboard</h1>

        {state.isLoading ? (
          <Loader />
        ) : (
          <>
            {state.form.length > 0 && (
              <div className="mt-4 lg:mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {state.packages.map((pk, index) => (
                    <div
                      key={`package-${pk.id}`}
                      className="border border-gray-200 p-6 rounded-lg flex flex-col gap-4"
                    >
                      <Input
                        label="Name"
                        value={state.form[index].name}
                        onChange={(e) =>
                          actions.handleChange(
                            e.target.value,
                            "name",
                            pk.id as number
                          )
                        }
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          name="price"
                          type="number"
                          label="Price"
                          value={state.form[index].price}
                          onChange={(e) =>
                            actions.handleChange(
                              Number(e.target.value),
                              "price",
                              pk.id as number
                            )
                          }
                        />
                        <Input
                          name="discount"
                          type="number"
                          label="Discount"
                          value={state.form[index].discount}
                          onChange={(e) =>
                            actions.handleChange(
                              Number(e.target.value),
                              "discount",
                              pk.id as number
                            )
                          }
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <Input
                          type="number"
                          label="Max Event"
                          value={state.form[index].max_events}
                          onChange={(e) =>
                            actions.handleChange(
                              Number(e.target.value),
                              "max_events",
                              pk.id as number
                            )
                          }
                        />
                        <Input
                          type="number"
                          label="Max Photos"
                          value={state.form[index].max_gallery_photos}
                          onChange={(e) =>
                            actions.handleChange(
                              Number(e.target.value),
                              "max_gallery_photos",
                              pk.id as number
                            )
                          }
                        />
                        <Input
                          type="number"
                          label="Max Videos"
                          value={state.form[index].max_videos}
                          onChange={(e) =>
                            actions.handleChange(
                              Number(e.target.value),
                              "max_videos",
                              pk.id as number
                            )
                          }
                        />
                      </div>
                      <InputCheckbox
                        checked={state.form[index].unlimited_revisions}
                        type="checkbox"
                        label="Unlimited Revision"
                        onChange={() =>
                          actions.handleChange(
                            !state.form[index].unlimited_revisions,
                            "unlimited_revisions",
                            pk.id as number
                          )
                        }
                      />
                      <InputCheckbox
                        checked={state.form[index].unlimited_guest_names}
                        type="checkbox"
                        label="Unlimited Guest"
                        onChange={() =>
                          actions.handleChange(
                            !state.form[index].unlimited_guest_names,
                            "unlimited_guest_names",
                            pk.id as number
                          )
                        }
                      />
                      <InputCheckbox
                        checked={state.form[index].custom_opening_closing}
                        type="checkbox"
                        label="Custom Opening & Closing"
                        onChange={() =>
                          actions.handleChange(
                            !state.form[index].custom_opening_closing,
                            "custom_opening_closing",
                            pk.id as number
                          )
                        }
                      />
                      <InputCheckbox
                        checked={state.form[index].countdown}
                        type="checkbox"
                        label="Countdown"
                        onChange={() =>
                          actions.handleChange(
                            !state.form[index].countdown,
                            "countdown",
                            pk.id as number
                          )
                        }
                      />
                      <InputCheckbox
                        checked={state.form[index].contact_social_media}
                        type="checkbox"
                        label="Social Media"
                        onChange={() =>
                          actions.handleChange(
                            !state.form[index].contact_social_media,
                            "contact_social_media",
                            pk.id as number
                          )
                        }
                      />
                      <InputCheckbox
                        checked={state.form[index].background_sound}
                        type="checkbox"
                        label="Background Music"
                        onChange={() =>
                          actions.handleChange(
                            !state.form[index].background_sound,
                            "background_sound",
                            pk.id as number
                          )
                        }
                      />
                      <InputCheckbox
                        checked={state.form[index].rsvp_and_greetings}
                        type="checkbox"
                        label="RSVP & Wishes"
                        onChange={() =>
                          actions.handleChange(
                            !state.form[index].rsvp_and_greetings,
                            "rsvp_and_greetings",
                            pk.id as number
                          )
                        }
                      />
                      <InputCheckbox
                        checked={state.form[index].google_maps_integration}
                        type="checkbox"
                        label="Google Maps Integration"
                        onChange={() =>
                          actions.handleChange(
                            !state.form[index].google_maps_integration,
                            "google_maps_integration",
                            pk.id as number
                          )
                        }
                      />
                      <InputCheckbox
                        checked={state.form[index].add_to_calendar}
                        type="checkbox"
                        label="Add to Google Calendar"
                        onChange={() =>
                          actions.handleChange(
                            !state.form[index].add_to_calendar,
                            "add_to_calendar",
                            pk.id as number
                          )
                        }
                      />
                      <InputCheckbox
                        checked={state.form[index].custom_cover}
                        type="checkbox"
                        label="Cover Image / Video Cover"
                        onChange={() =>
                          actions.handleChange(
                            !state.form[index].custom_cover,
                            "custom_cover",
                            pk.id as number
                          )
                        }
                      />
                      <InputCheckbox
                        checked={state.form[index].digital_envelope}
                        type="checkbox"
                        label="Digital Envelope"
                        onChange={() =>
                          actions.handleChange(
                            !state.form[index].digital_envelope,
                            "digital_envelope",
                            pk.id as number
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-6 bg-gray-50 border p-4 rounded-lg">
                  <ButtonPrimary
                    onClick={actions.handleSubmit}
                    isloading={state.isLoading || state.loading}
                    type="button"
                    title="Update Package"
                    icon={<BiEdit />}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token") || null;
  const role = cookies.get("role") || null;

  if (token && role) {
    const isExpired = isTokenExpired(token);
    if (isExpired) {
      return {
        redirect: {
          destination: "/admin/login",
          permanent: false,
        },
      };
    }
    if (role !== "admin") {
      cookies.set("token", "", { maxAge: -1, path: "/" });
      cookies.set("user", "", { maxAge: -1, path: "/" });
      cookies.set("role", "", { maxAge: -1, path: "/" });
      return {
        redirect: {
          destination: "/admin/login",
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
};

export default PackagesDashboard;
