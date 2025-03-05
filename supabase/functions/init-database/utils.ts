
// Add table prefix to statements if needed
export const addPrefixToStatements = (
  statements: string[], 
  tablePrefix: string
): string[] => {
  if (!tablePrefix) return statements;
  
  return statements.map(statement => {
    // Replace "CREATE TABLE IF NOT EXISTS table_name" with "CREATE TABLE IF NOT EXISTS prefix_table_name"
    return statement.replace(
      /(CREATE TABLE IF NOT EXISTS )(\w+)/i, 
      `$1${tablePrefix}$2`
    );
  });
};

// Add table prefix to foreign key statements if needed
export const addPrefixToForeignKeyStatements = (
  statements: string[], 
  tablePrefix: string
): string[] => {
  if (!tablePrefix) return statements;
  
  return statements.map(statement => {
    // Replace table names with prefixed versions
    return statement
      .replace(/ALTER TABLE (\w+)/i, `ALTER TABLE ${tablePrefix}$1`)
      .replace(/REFERENCES (\w+)/gi, `REFERENCES ${tablePrefix}$1`);
  });
};
