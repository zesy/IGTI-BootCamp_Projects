import Select from "react-select";

export default function ComboBox({
  children = "*ComboBox*",
  onChangeCombo = null,
}) {
  //
  function handleOnSelectChange(data) {
    if (onChangeCombo) onChangeCombo(data);
  }

  return (
    <div className="flex flex-col items-center pt-2">
      <div>
        <h4 className="font-semibold text-lg">Selecione a Cidade:</h4>
      </div>
      <div className="w-3/5 shadow-md">
        <Select
          options={children}
          placeholder="Selecione..."
          onChange={handleOnSelectChange}
        ></Select>
      </div>
    </div>
  );
}
