/**
 * Types for the Core assets surface: hardware assets, SaaS assets, SaaS
 * users, and the product catalog (read-only, US-only).
 */

export interface CoreHardwareAsset {
  id: string;
  name?: string;
  serial_number?: string;
  type?: string;
  location_name?: string;
  client?: { id?: string; name?: string };
  manufacturer?: { id?: string; name?: string };
  model?: { number?: string };
  [key: string]: unknown;
}

export interface CoreHardwareAssetListParams {
  'filter[id]'?: string;
  'filter[name]'?: string;
  'filter[client.id]'?: string;
  'filter[client.name]'?: string;
  'filter[contact.id]'?: string;
  'filter[manufacturer.id]'?: string;
  'filter[manufacturer.name]'?: string;
  'filter[model.number]'?: string;
  'filter[serial_number]'?: string;
  'filter[type]'?: string;
  'filter[location_name]'?: string;
  'filter[configuration.cpu.name]'?: string;
  'filter[configuration.cpu.manufacturer_name]'?: string;
  'filter[configuration.cpu.manufacturer_id]'?: string;
  'filter[configuration.ram_bytes]'?: string;
  'filter[configuration.disks.total_bytes]'?: string;
}

export interface CoreSaasAsset {
  id: string;
  status?: string;
  tenant_domain?: string;
  client?: { id?: string; name?: string };
  product?: { id?: string; name?: string; category?: string };
  term?: { starts_at?: string; ends_at?: string; is_auto_renewed?: boolean };
  [key: string]: unknown;
}

export interface CoreSaasAssetListParams {
  'filter[id]'?: string;
  'filter[client.id]'?: string;
  'filter[client.name]'?: string;
  'filter[product.manufacturer.id]'?: string;
  'filter[product.manufacturer.name]'?: string;
  'filter[product.id]'?: string;
  'filter[product.name]'?: string;
  'filter[product.category]'?: string;
  'filter[product.manufacturer_sku.id]'?: string;
  'filter[product.manufacturer_sku.name]'?: string;
  'filter[status]'?: string;
  'filter[tenant_domain]'?: string;
  'filter[term.starts_at]'?: string;
  'filter[term.ends_at]'?: string;
  'filter[term.is_auto_renewed]'?: string;
  'filter[subscriptions.id]'?: string;
}

export interface CoreSaasUser {
  id: string;
  client?: { id?: string; name?: string };
  contact?: { id?: string };
  asset?: { id?: string; status?: string };
  product?: { id?: string; name?: string; category?: string };
  [key: string]: unknown;
}

export interface CoreSaasUserListParams {
  'filter[id]'?: string;
  'filter[client.id]'?: string;
  'filter[client.name]'?: string;
  'filter[contact.id]'?: string;
  'filter[asset.id]'?: string;
  'filter[asset.status]'?: string;
  'filter[product.manufacturer.id]'?: string;
  'filter[product.manufacturer.name]'?: string;
  'filter[product.id]'?: string;
  'filter[product.name]'?: string;
  'filter[product.category]'?: string;
  'filter[product.manufacturer_sku.id]'?: string;
  'filter[product.manufacturer_sku.name]'?: string;
  'filter[term.starts_at]'?: string;
  'filter[term.ends_at]'?: string;
  'filter[subscription.id]'?: string;
}

export interface CoreProductCatalogRecord {
  id: string;
  name?: string;
  category?: string;
  subcategory?: string;
  product_type?: string;
  product_class?: string;
  manufacturer_name?: string;
  source_system?: string;
  is_active?: boolean;
  updated_at?: string;
  [key: string]: unknown;
}

export interface CoreProductCatalogListParams {
  'filter[id]'?: string;
  'filter[source_system]'?: string;
  'filter[source_product_id]'?: string;
  'filter[source_product_identifier]'?: string;
  'filter[name]'?: string;
  'filter[category]'?: string;
  'filter[subcategory]'?: string;
  'filter[product_type]'?: string;
  'filter[product_class]'?: string;
  'filter[manufacturer_name]'?: string;
  'filter[is_active]'?: string;
  'filter[updated_at]'?: string;
  'filter[record_lineage.source_record_id]'?: string;
  'filter[record_lineage.integration_configuration.id]'?: string;
  'filter[record_lineage.integration_configuration.vendor.id]'?: string;
  'filter[record_lineage.integration_configuration.vendor.brand_name]'?: string;
}
