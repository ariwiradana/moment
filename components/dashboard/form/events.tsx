import Input from "@/components/admin/elements/input";
import { montserrat } from "@/lib/fonts";
import { Event } from "@/lib/types";
import useClientFormStore, { initialEvent } from "@/store/useClientFormStore";
import React from "react";
import { BiSolidPlusCircle, BiTime, BiTrash } from "react-icons/bi";
import ButtonPrimary from "../elements/button.primary";
import ButtonSecondaryDashboard from "../elements/button.secondary";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import toast from "react-hot-toast";
import InputTextarea from "@/components/admin/elements/textarea";
import Accordion from "@/components/admin/elements/accordion.button";
import ButtonSecondary from "@/components/admin/elements/button.secondary";
import moment from "moment";

const EventForm = () => {
  const {
    setForm,
    form,
    activeStep,
    setActiveStep,
    toggleEndTimes,
    setToggleEndTimes,
  } = useClientFormStore();

  const handleChangeEvent = (index: number, name: string, value: string) => {
    const newEvents = [...form.events];
    newEvents[index] = {
      ...newEvents[index],
      [name]: value,
    };
    setForm("events", newEvents);
  };

  return (
    <div className={`${montserrat.className}`}>
      <div className="max-w-screen-md flex flex-col gap-3">
        {form.events.map((_, index) => (
          <Accordion
            isExpanded={index === 0}
            key={`Form Event ${index + 1}`}
            title={`Acara ${index + 1}`}
            content={
              <div className="flex flex-col gap-y-4">
                <Input
                  value={form.events[index].name}
                  placeholder="Contoh: Pawiwahan"
                  className="w-full"
                  label="Nama Acara"
                  onChange={(e) =>
                    handleChangeEvent(index, "name", e.target.value)
                  }
                />
                <InputTextarea
                  value={form.events[index].address}
                  placeholder="Contoh: JL. Raya Kerobokan, Kuta Utara, Badung"
                  rows={6}
                  label="Alamat Acara"
                  onChange={(e) =>
                    handleChangeEvent(index, "address", e.target.value)
                  }
                />
                <Input
                  value={form.events[index].address_url}
                  placeholder="Contoh: https://maps.app.goo.gl/VSiLyz8NyzUs5TKC6"
                  className="w-full"
                  label="Link Google Maps"
                  onChange={(e) =>
                    handleChangeEvent(index, "address_url", e.target.value)
                  }
                />
                <Input
                  min={moment().format("YYYY-MM-DD")}
                  value={form.events[index].date}
                  className="w-full"
                  type="date"
                  label="Tanggal Acara"
                  onChange={(e) =>
                    handleChangeEvent(index, "date", e.target.value)
                  }
                />
                <div className="grid lg:grid-cols-2 gap-4 w-full">
                  <Input
                    value={form.events[index].start_time}
                    className="w-full"
                    type="time"
                    label="Jam Mulai Acara"
                    onChange={(e) =>
                      handleChangeEvent(index, "start_time", e.target.value)
                    }
                  />
                  <Input
                    type={!toggleEndTimes[index] ? "time" : "text"}
                    disabled={toggleEndTimes[index]}
                    value={form.events[index].end_time}
                    className="w-full"
                    label="Jam Selesai Acara"
                    onChange={(e) =>
                      handleChangeEvent(index, "end_time", e.target.value)
                    }
                  />
                </div>
                <div className="flex justify-between w-full">
                  <ButtonPrimary
                    icon={<BiTime />}
                    size="small"
                    title={
                      toggleEndTimes[index]
                        ? "Atur Jam Selesai Acara"
                        : "Atur Sampai Selesai"
                    }
                    onClick={() => {
                      setToggleEndTimes(index);
                      handleChangeEvent(
                        index,
                        "end_time",
                        !toggleEndTimes[index] ? "Selesai" : ""
                      );
                    }}
                    type="button"
                    className="text-sm whitespace-nowrap"
                  />
                  {form.events.length > 1 && (
                    <ButtonSecondaryDashboard
                      onClick={() => {
                        const newEvents = [...form.events];
                        newEvents.splice(index, 1);
                        setForm("events", newEvents);
                      }}
                      icon={<BiTrash />}
                      type="button"
                      size="small"
                    />
                  )}
                </div>
              </div>
            }
          />
        ))}
      </div>
      <div className="mt-4">
        <ButtonSecondary
          onClick={() => {
            setForm("events", [...form.events, initialEvent]);
          }}
          type="button"
          title="Tambah Acara Lainnya"
          size="small"
          icon={<BiSolidPlusCircle />}
        />
      </div>
      <div className="flex justify-between p-6 bg-zinc-50 mt-5 rounded-lg">
        <ButtonPrimary
          size="medium"
          type="button"
          icon={<IoArrowBack />}
          title="Sebelumnya"
          onClick={() => {
            setActiveStep(activeStep - 1);
          }}
        />
        <ButtonPrimary
          type="button"
          size="medium"
          icon={<IoArrowForward />}
          iconPosition="right"
          title="Berikutnya"
          onClick={() => {
            const isValid = form.events.every((item) => {
              return Object.keys(item).every((key: string) => {
                return (
                  key === "image" ||
                  (item[key as keyof Event] as string)?.trim() !== ""
                );
              });
            });
            if (!isValid) {
              toast.error("Lengkapi semua informasi acara.");
              return;
            }
            setActiveStep(activeStep + 1);
          }}
        />
      </div>
    </div>
  );
};

export default EventForm;
