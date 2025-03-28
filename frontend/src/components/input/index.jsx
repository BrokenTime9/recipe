export const Input = ({ type, name, value, setValue }) => {
  return (
    <div>
      <label className="block text-blue-700 text-2xl font-semibold pt-4 pb-2">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      {name === "steps" ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value.split(","))}
          className="w-full p-2 border rounded"
          required
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) =>
            setValue(
              name === "ingredients"
                ? e.target.value.split(",")
                : e.target.value,
            )
          }
          className="w-full p-2 border rounded"
          required
        />
      )}
    </div>
  );
};
