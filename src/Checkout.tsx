import { useState } from "react";
import { useNumberFormatter } from "react-aria";

export function Checkout() {
  const [price, setPrice] = useState(0);

  const nf = useNumberFormatter({
    style: 'currency',
    currency: 'USD'
  });

  return (
    <div className="p-2 border border-white rounded">
      <h2 className="mb-2 text-center">pretend this is a checkout flow</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // @ts-expect-error ts doesn't know about form target?
          setPrice(e.target.price.value)
        }}
        className="flex items-center"
      >
        <label htmlFor="price">price</label>
        <input
          name="price"
          defaultValue={0}
          id="price"
          className="p-2 mx-2 text-black rounded min-w-0 flex-auto"
          type="number"
        />
        <button className="rounded border border-white p-2" type="submit">
          set price
        </button>
      </form>
      <hr className="my-2"/>
      <div className="text-xl flex justify-between">
        <h2>Total</h2>
        
        {nf.format(price)}
      </div>
    </div>
  );
}
