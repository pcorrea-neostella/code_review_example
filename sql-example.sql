CREATE TABLE example_table (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    email varchar(10) NULL,
    created_by uuid NOT NULL,
	updated_by uuid NOT NULL
);