import React, { FunctionComponent, ChangeEvent, useState } from 'react';
import clsx from 'clsx';
import Badge from '../Badge/Badge';

import styles from './AttachmentField.module.css';

export interface AttachmentFieldProps {
  /**
   * Javascript event handler.
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Disables any interaction with the component.
   */
  disabled?: boolean;
  /**
   * Sets a fixed width (px) for the input field.
   */
  width?: number;
  /**
  * Sets a placeholder.
  */
  placeholder?: string;
}

/**
 * An attachment field allows the user to upload a file.
 * The acceptable file formats are any type of image and PDF.
 */
const AttachmentField: FunctionComponent<AttachmentFieldProps> = ({
  width = -1,
  disabled = false,
  placeholder = '',
  onChange = () => null,
}: AttachmentFieldProps) => {

  const [files, setFiles] = useState<string[]>([]);

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const targetFiles = target?.files;
    const fileName = targetFiles && targetFiles.length >= 0 && targetFiles[0].name;
    const exists = fileName && files.includes(fileName);
    if (!exists && fileName) setFiles((prev) => ([...prev, fileName]));

    if (onChange) onChange(event);
  };

  const onClearAttachment = (fileName: string) => {
    setFiles(files.filter((file) => (file !== fileName)));
  };

  return (
    <div
      className={clsx(styles.attachmentFieldContainer, {
        [styles.disabled]: disabled,
      })}
      style={{ width: width >= 0 ? `${width}px` : '100%' }}
    >
      <div className={styles.attachmentFieldLayoutContainer}>
        <div className={styles.attachmentFieldIconContainer}>
          <span className={clsx('pyreneIcon-attachment', styles.attachmentFieldIcon)} />
          {files.length === 0 && <span className={styles.placeholder}>{placeholder}</span>}
          <input
            className={styles.attachmentFieldInput}
            type="file"
            accept="image/*,.pdf"
            onChange={(value) => onUpload(value)}
            multiple
          />
        </div>
        <div className={styles.attachmentField}>
          <div className={styles.attachmentContainer}>
            {files.map(
              (file) => (
                <div key={file} className={styles.attachment}>
                  <Badge
                    label={file}
                    maxWidth={80}
                    type="neutral"
                  />
                  <button type="button" className={styles.pill} onClick={() => onClearAttachment(file)}>x</button>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


AttachmentField.displayName = 'AttachmentField';

export default AttachmentField;
