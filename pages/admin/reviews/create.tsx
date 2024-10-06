import React from "react";
import { montserrat } from "@/lib/fonts";
import AdminLayout from "@/components/admin/layouts";
import Input from "@/components/admin/elements/input";
import ButtonPrimary from "@/components/admin/elements/button.primary";
import { BiFolderPlus, BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { useAdminCreateTheme } from "@/hooks/admin/useAdminCreateTheme";

const CreateTheme: React.FC = () => {
  const { state, actions } = useAdminCreateTheme();
  return (
    <AdminLayout>
      <div className={`${montserrat.className}`}>
        <Link href="/admin/clients">
          <div className="flex items-center gap-x-1 text-gray-400">
            <BiLeftArrowAlt className="text-base" />
            <span className="text-sm font-medium">back</span>
          </div>
        </Link>
        <h1 className="text-2xl font-bold mb-8 mt-2">Add New Theme</h1>
        <form
          onSubmit={actions.handleSubmit}
          className="mt-8 max-w-screen-md flex flex-col gap-y-4"
        >
          <Input
            onChange={actions.handleChange}
            name="name"
            label="Theme Name"
            value={state.formData.name}
          />
          <Input
            onChange={actions.handleChange}
            name="thumbnail"
            type="File"
            label="Thumbnail"
          />
          <div className="flex justify-end mt-6 bg-gray-50 border p-4 rounded-lg">
            <ButtonPrimary
              isloading={state.loading}
              title="Add Theme"
              icon={<BiFolderPlus />}
            />
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateTheme;
