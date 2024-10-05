import ButtonPrimary from "@/components/admin/elements/button.primary";
import Loader from "@/components/admin/elements/loader";
import InputSelect from "@/components/admin/elements/select";
import AdminLayout from "@/components/admin/layouts";
import { useAdminReviews } from "@/hooks/admin/useAdminReviews";
import { montserrat } from "@/lib/fonts";
import { getInitial } from "@/utils/getInitial";
import { getRandomColors } from "@/utils/getRandomColor";
import { Pagination } from "@mui/material";
import React from "react";
import { BiTrash } from "react-icons/bi";

const ReviewDashboard: React.FC = () => {
  const { state, actions } = useAdminReviews();

  return (
    <AdminLayout>
      <div className={`w-full ${montserrat.className}`}>
        <h1 className="text-2xl font-bold mb-4">Review Dashboard</h1>

        {state.isLoading ? (
          <Loader />
        ) : (
          <>
            {state.clientOptions.length > 0 && (
              <div className="md:flex">
                <InputSelect
                  onChange={(e) =>
                    actions.handleChangeClient(parseInt(e.target.value))
                  }
                  value={state.clientId ?? ""}
                  inputSize="medium"
                  label="Client"
                  options={state.clientOptions}
                />
              </div>
            )}
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
                {state.reviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <div className="flex justify-between items-center gap-x-2 w-full">
                        <div className="flex items-center gap-x-3">
                          <div
                            style={{
                              backgroundColor: getRandomColors(),
                            }}
                            className="w-8 h-8 rounded-full flex justify-center items-center font-medium text-white text-sm p-1"
                          >
                            {getInitial(review.name)}
                          </div>
                          <div>
                            <h1 className="text-gray-800 font-semibold text-sm">
                              {review.name}
                            </h1>
                            <p className="text-gray-500 font-medium text-xs">
                              {review.attendant}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-3 flex flex-col gap-y-2">
                      <div>
                        <p className="text-gray-500 font-medium text-xs">
                          Wishes
                        </p>
                        <p className="text-gray-800 font-semibold text-sm">
                          {review.wishes}
                        </p>
                      </div>
                    </div>
                    <div className="border-t pt-3 flex justify-end gap-x-3">
                      <ButtonPrimary
                        type="button"
                        onClick={() => actions.handleDelete(review.id)}
                        size="extrasmall"
                        title="Delete"
                        icon={<BiTrash className="text-base" />}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {state.toalRows > 0 && (
                <div className="border border-gray-200 rounded-xl hidden lg:block">
                  <table className="table-auto overflow-x-auto w-full table">
                    <thead>
                      <tr>
                        <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-tl-xl">
                          User
                        </td>
                        <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                          Wishes
                        </td>
                        <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-tr-xl">
                          Actions
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {state.reviews.map((review, index) => (
                        <tr
                          key={review.id}
                          className={`border-b ${
                            state.reviews.length - 1 === index
                              ? "border-b-transparent"
                              : "border-b-gray-200"
                          }`}
                        >
                          <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                            <div className="flex items-center gap-x-3">
                              <div
                                style={{
                                  backgroundColor: getRandomColors(),
                                }}
                                className="h-10 w-10 rounded-full aspect-square flex justify-center items-center text-base"
                              >
                                <span className="text-white font-medium">
                                  {getInitial(review.name)}
                                </span>
                              </div>
                              <div>
                                <span>{review.name}</span>
                                <p className="text-gray-500 font-medium text-xs">
                                  {review.attendant}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-3 text-gray-800 text-sm">
                            {review.wishes}
                          </td>
                          <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                            <div className="flex gap-x-2">
                              <ButtonPrimary
                                type="button"
                                onClick={() => actions.handleDelete(review.id)}
                                size="extrasmall"
                                title="Delete"
                                icon={<BiTrash className="text-base" />}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {state.toalRows > state.limit && (
          <div className="mt-6 flex justify-center">
            <Pagination
              page={state.page}
              onChange={actions.handleChangePagination}
              count={Math.ceil(state.toalRows / state.limit)}
              shape="rounded"
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ReviewDashboard;
