import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";

const dates = ["2025-10-28", "2025-10-29", "2025-10-30"];
const hours = Array.from({ length: 9 }, (_, i) => 8 + i); // 8 AM to 5 PM
const minuteOptions = [0, 15, 30, 45];

export default function MeetingScheduler() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState({ hour: "", minute: "" });
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Meet with Ackley Hartnett – CPHI Frankfurt 2025 – Hall 9, Stand G47
      </h1>
      {submitted ? (
        <Card className="text-center">
          <CardContent className="p-6">
            <p className="text-xl font-semibold">Thank you!</p>
            <p>Your request has been submitted for approval. We'll be in touch soon.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="space-y-4 p-6">
            <div>
              <label className="block mb-1 font-medium">Select Date</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="">-- Choose a date --</option>
                {dates.map((d) => (
                  <option key={d} value={d}>
                    {format(parseISO(d), "MMMM d, yyyy")}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Hour</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={selectedTime.hour}
                  onChange={(e) => setSelectedTime({ ...selectedTime, hour: e.target.value })}
                >
                  <option value="">-- Hour --</option>
                  {hours.map((h) => (
                    <option key={h} value={h}>{`${h}:00`}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Minute</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={selectedTime.minute}
                  onChange={(e) => setSelectedTime({ ...selectedTime, minute: e.target.value })}
                >
                  <option value="">-- Minute --</option>
                  {minuteOptions.map((m) => (
                    <option key={m} value={m}>{m.toString().padStart(2, "0")}</option>
                  ))}
                </select>
              </div>
            </div>

            <Input placeholder="Your Name" value={formData.name} onChange={handleChange("name")} />
            <Input placeholder="Company" value={formData.company} onChange={handleChange("company")} />
            <Input type="email" placeholder="Email" value={formData.email} onChange={handleChange("email")} />
            <Textarea placeholder="Additional Notes (optional)" value={formData.notes} onChange={handleChange("notes")} />

            <Button className="w-full" onClick={handleSubmit} disabled={!selectedDate || !selectedTime.hour || !selectedTime.minute || !formData.name || !formData.company || !formData.email}>
              Submit Request
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
