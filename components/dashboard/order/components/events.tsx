import Input from "@/components/admin/elements/input";
import useOrderStore from "@/store/useOrderStore";
import React, { useEffect, useState } from "react";
import { BiPlus, BiTrash } from "react-icons/bi";
import ButtonSecondary from "../../elements/button.secondary";
import InputTextarea from "@/components/admin/elements/textarea";
import moment from "moment";
import { initialEvent } from "@/store/useClientFormStore";
import Accordion from "../accordion.button";
import ButtonDanger from "../../elements/button.danger";

const OrderEvents = () => {
  const store = useOrderStore();

  const handleChangeEvent = (index: number, name: string, value: string) => {
    const newEvents = [...store.form.events];
    newEvents[index] = {
      ...newEvents[index],
      [name]: value,
    };
    store.setForm("events", newEvents);
  };

  const [toggleEndTimes, setToggleEndTimes] = useState([false]);
  const [expandedAccordions, setExpandedAccordions] = useState([true]);

  const handleToggleEndTimes = (index: number) => {
    const newToggleEndTimes = [...toggleEndTimes];
    newToggleEndTimes[index] = !newToggleEndTimes[index];
    setToggleEndTimes(newToggleEndTimes);
  };

  const handleNewEvent = () => {
    const newExpandedAccordions = expandedAccordions.map(() => false);
    newExpandedAccordions.push(true);
    setExpandedAccordions(newExpandedAccordions);
    store.setForm("events", [...store.form.events, initialEvent]);
  };

  useEffect(() => {
    if (!store.pkg) return;

    const maxEvents = store.pkg.max_events ?? 1;
    const currentEvents = store.form.events;
    if (currentEvents.length > maxEvents) {
      const trimmedEvents = currentEvents.slice(0, maxEvents);
      store.setForm("events", trimmedEvents);
    }
  }, [store.pkg]);

  return (
    <>
      {store.form.events.map((_, index) => (
        <Accordion
          setIsExpanded={() => {
            const newExpandeds = expandedAccordions.map(() => false);
            newExpandeds[index] = !expandedAccordions[index];
            setExpandedAccordions(newExpandeds);
          }}
          isExpanded={expandedAccordions[index]}
          key={`Form Event ${index + 1}`}
          title={`Acara ${index + 1}`}
          content={
            <div className="flex flex-col gap-y-4">
              <Input
                value={store.form.events[index].name}
                placeholder="Contoh: Pawiwahan"
                className="w-full"
                label="Nama Acara"
                onChange={(e) =>
                  handleChangeEvent(index, "name", e.target.value)
                }
              />
              <InputTextarea
                value={store.form.events[index].address}
                placeholder="Contoh: JL. Raya Kerobokan, Kuta Utara, Badung"
                rows={5}
                label="Alamat Acara"
                onChange={(e) =>
                  handleChangeEvent(index, "address", e.target.value)
                }
              />
              <Input
                value={store.form.events[index].address_url}
                placeholder="Contoh: https://maps.app.goo.gl/VSiLyz8NyzUs5TKC6"
                className="w-full"
                label="Link Google Maps"
                onChange={(e) =>
                  handleChangeEvent(index, "address_url", e.target.value)
                }
              />
              <Input
                min={moment().format("YYYY-MM-DD")}
                value={store.form.events[index].date}
                className="w-full"
                type="date"
                label="Tanggal Acara"
                onChange={(e) =>
                  handleChangeEvent(index, "date", e.target.value)
                }
              />
              <div className="grid lg:grid-cols-2 gap-4 w-full">
                <Input
                  value={store.form.events[index].start_time}
                  className="w-full"
                  type="time"
                  label="Jam Mulai Acara"
                  onChange={(e) =>
                    handleChangeEvent(index, "start_time", e.target.value)
                  }
                />
                <div className="flex items-end">
                  <Input
                    type={!toggleEndTimes[index] ? "time" : "text"}
                    disabled={toggleEndTimes[index]}
                    value={store.form.events[index].end_time}
                    className="w-full"
                    label="Jam Selesai Acara"
                    onChange={(e) =>
                      handleChangeEvent(index, "end_time", e.target.value)
                    }
                  />
                  <button
                    onClick={() => {
                      handleToggleEndTimes(index);
                      handleChangeEvent(
                        index,
                        "end_time",
                        !toggleEndTimes[index] ? "Selesai" : ""
                      );
                    }}
                    type="button"
                    className={`bg-dashboard-dark text-white text-sm px-2 ${
                      toggleEndTimes[index] ? "min-h-[58px]" : "min-h-[60px]"
                    }`}
                  >
                    {toggleEndTimes[index]
                      ? "Atur Jam Selesai Acara"
                      : "Atur Sampai Selesai"}
                  </button>
                </div>
              </div>

              <div>
                {store.form.events.length > 1 && (
                  <ButtonDanger
                    title="Hapus"
                    onClick={() => {
                      const newEvents = [...store.form.events];
                      newEvents.splice(index, 1);
                      store.setForm("events", newEvents);
                    }}
                    icon={<BiTrash />}
                    type="button"
                    size="medium"
                  />
                )}
              </div>
            </div>
          }
        />
      ))}
      {store.pkg && store.form.events.length < store.pkg?.max_events ? (
        <div>
          <ButtonSecondary
            onClick={handleNewEvent}
            type="button"
            title="Tambah Acara Lainnya"
            size="medium"
            icon={<BiPlus />}
          />
        </div>
      ) : null}
    </>
  );
};

export default OrderEvents;
