"use client";

import { CheckSquare2 } from "lucide-react";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type PlanCardProps = {
  name: string;
  price: string;
  features: string[];
  selected: boolean;
};

type PlanItemProps = PlanCardProps & {
  value: string;
  field: any;
};

const PlanCard = ({ name, price, features, selected }: PlanCardProps) => {
  return (
    <div
      className={`flex flex-col px-7 py-7 rounded-2xl shadow-md bg-white ${
        selected && "outline"
      } hover:outline hover:outline-slate-400 hover:cursor-pointer w-full h-full border border-neutral-200`}
    >
      <h3 className="text-xl font-semibold mb-8">{name}</h3>

      <div className="flex flex-col gap-4">
        <div className="flex gap-1 items-center w-full">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-xs dark:white w-full opacity-70">
            per Month / User
          </span>
        </div>
      </div>

      <div className="mt-3">
        <span className="text-sm">This includes:</span>
        <ul className="mt-3 space-y-3">
          {features.map((feature: string) => (
            <li
              key={feature}
              className="text-sm flex gap-3 items-center justify-top"
            >
              <div className="min-w-6 w-6 h-6 flex justify-center items-center">
                <CheckSquare2 />
              </div>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PlanItem = ({ value, field, name, price, features }: PlanItemProps) => {
  return (
    <>
      <RadioGroupItem
        value={value}
        className="w-full h-full rounded-none absolute border-none first:opacity-0"
      />
      <PlanCard
        selected={field.value === value}
        name={name}
        price={price}
        features={features}
      />
    </>
  );
};

export function PlanPicker({ form }: { form: any }) {
  return (
    <FormField
      control={form.control}
      name="plan"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price Plan</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid gap-5 md:gap-5 lg:gap-5 justify-between"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(290px, 290px))",
              }}
            >
              <FormItem className="flex items-center relative">
                <FormControl>
                  <PlanItem
                    field={field}
                    value="basic"
                    selected={field.value === "basic"}
                    name="Basic"
                    price="0"
                    features={["1 user", "1 project"]}
                  />
                </FormControl>
              </FormItem>
              <FormItem className="flex items-center relative">
                <FormControl>
                  <PlanItem
                    field={field}
                    value="starter"
                    selected={field.value === "starter"}
                    name="Starter"
                    price="8"
                    features={[
                      "$8 dollars per user per month",
                      "Up to 3 projects",
                      "AI Addon",
                    ]}
                  />
                </FormControl>
              </FormItem>
              <FormItem className="flex items-center relative">
                <FormControl>
                  <PlanItem
                    field={field}
                    value="business"
                    selected={field.value === "business"}
                    name="Business"
                    price="12"
                    features={[
                      "Up to 10 users included, then $1 per every 10 users",
                      "Up to 15 projects",
                      "AI Addon",
                    ]}
                  />
                </FormControl>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormDescription>
            Choose a price plan for your organization.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
