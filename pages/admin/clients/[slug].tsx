import React from "react";
import { GetServerSideProps } from "next";
import { montserrat } from "@/lib/fonts";
import AdminLayout from "@/components/admin/layouts";
import Input from "@/components/admin/elements/input";
import InputTextarea from "@/components/admin/elements/textarea";
import moment from "moment";
import ButtonPrimary from "@/components/admin/elements/button.primary";
import { BiEdit, BiLeftArrowAlt, BiSolidPlusCircle } from "react-icons/bi";
import Link from "next/link";
import Accordion from "@/components/admin/elements/accordion.button";
import ButtonSecondary from "@/components/admin/elements/button.secondary";
import { useAdminClient } from "@/hooks/admin/useAdminCLient";

interface UpdateClientProps {
  slug: string;
}

const UpdateClient: React.FC<UpdateClientProps> = ({ slug }) => {
  const { client } = useAdminClient(slug);

  return (
    <AdminLayout>
      <div className={`${montserrat.className}`}>
        <Link href="/admin/clients">
          <div className="flex items-center gap-x-1 text-gray-400">
            <BiLeftArrowAlt className="text-base" />
            <span className="text-sm font-medium">back</span>
          </div>
        </Link>
        <h1 className="text-2xl font-bold mb-8 mt-2">Client Detail</h1>
        <form className="mt-8 max-w-screen-md flex flex-col gap-y-4">
          <Input label="Client Name" defaultValue={client?.name} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Input
              className="w-full"
              label="Address"
              defaultValue={client?.address}
            />
            <Input
              className="w-full"
              label="Address URL"
              defaultValue={client?.address_url}
            />
          </div>
          <InputTextarea
            label="Address Full"
            defaultValue={client?.address_full ?? ""}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Input
              className="w-full"
              type="date"
              label="Date"
              defaultValue={moment(client?.date).format("YYYY-MM-DD")}
            />
            <Input
              className="w-full"
              label="Time"
              defaultValue={client?.time}
            />
          </div>

          <Input label="Theme" defaultValue={client?.theme?.name} />

          <h1 className="text-2xl font-bold mb-4 mt-8">Participant(s)</h1>
          <div className="flex flex-col gap-y-4">
            {client?.participants.map((participant, index) => (
              <Accordion
                key={`participant-${participant.participant_id}`}
                title={`Participant ${index + 1}`}
                content={
                  <div className="flex flex-col gap-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        className="w-full"
                        label="Full Name"
                        defaultValue={participant?.name}
                      />
                      <Input
                        className="w-full"
                        label="Nickname"
                        defaultValue={participant?.nickname}
                      />
                    </div>
                    <InputTextarea
                      label="Address Full"
                      defaultValue={participant?.address}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        className="w-full"
                        label="Gender"
                        defaultValue={participant?.gender}
                      />
                      <Input
                        className="w-full"
                        label="Child Order"
                        defaultValue={participant?.child}
                      />
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
            <ButtonPrimary title="Update Client" icon={<BiEdit />} />
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;

  return {
    props: {
      slug,
    },
  };
};

export default UpdateClient;
