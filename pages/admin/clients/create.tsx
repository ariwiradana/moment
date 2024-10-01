import React from "react";
import { montserrat } from "@/lib/fonts";
import AdminLayout from "@/components/admin/layouts";
import Input from "@/components/admin/elements/input";
import InputTextarea from "@/components/admin/elements/textarea";
import ButtonPrimary from "@/components/admin/elements/button.primary";
import { BiLeftArrowAlt, BiSolidPlusCircle, BiUserPlus } from "react-icons/bi";
import Link from "next/link";
import ButtonSecondary from "@/components/admin/elements/button.secondary";
import Accordion from "@/components/admin/elements/accordion.button";


const CreateClient: React.FC = () => {
  return (
    <AdminLayout>
      <div className={`${montserrat.className}`}>
        <Link href="/admin/clients">
          <div className="flex items-center gap-x-1 text-gray-400">
            <BiLeftArrowAlt className="text-base" />
            <span className="text-sm font-medium">back</span>
          </div>
        </Link>
        <h1 className="text-2xl font-bold mb-8 mt-2">Add New Client</h1>
        <form className="mt-8 max-w-screen-md flex flex-col gap-y-4">
          <Input label="Client Name" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Input className="w-full" label="Address" />
            <Input className="w-full" label="Address URL" />
          </div>
          <InputTextarea label="Address Full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Input className="w-full" type="date" label="Date" />
            <Input className="w-full" label="Time" />
          </div>

          <Input label="Theme" />
          <h1 className="text-2xl font-bold mb-4 mt-8">Participant(s)</h1>
          <div className="flex flex-col gap-y-4">
            {[1].map((participant, index) => (
              <Accordion
                key={`participant-${index}`}
                title={`Participant ${index + 1}`}
                content={
                  <div className="flex flex-col gap-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input className="w-full" label="Full Name" />
                      <Input className="w-full" label="Nickname" />
                    </div>
                    <InputTextarea label="Address Full" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input className="w-full" label="Gender" />
                      <Input className="w-full" label="Child Order" />
                    </div>
                  </div>
                }
              />
            ))}
            <div className="">
              <ButtonSecondary
                type="button"
                title="Add Another"
                size="small"
                icon={<BiSolidPlusCircle />}
              />
            </div>
          </div>
          <div className="flex justify-end mt-6 bg-gray-50 border p-4 rounded-lg">
            <ButtonPrimary title="Add Client" icon={<BiUserPlus />} />
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateClient;
